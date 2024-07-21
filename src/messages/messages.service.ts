import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { buildAndExecuteQuery } from './helpers/message-query-builder';
import { FilterMessageDto } from './dto/filter-message.dto';
import { Campaign } from '../campaigns/entities/campaign.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<string> {
    const { idCampaign, messages } = createMessageDto;
    const campaign = await this.campaignRepository.findOne({
      where: { idCampania: idCampaign },
    });
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    if (!messages || messages.length === 0) {
      throw new Error('Messages array cannot be empty');
    }

    for (const msg of messages) {
      if (!msg.message || msg.message.trim() === '') {
        throw new Error('Message is required');
      }
    }

    try {
      const { idCampaign, messages } = createMessageDto;
      const findCampaign = await this.campaignRepository.findOne({
        where: { idCampania: idCampaign },
      });
      if (!findCampaign) {
        throw new Error('Campaign not found');
      }

      for (const message of messages) {
        if (!message.message) {
          throw new Error('Message is required');
        }
        await this.messageRepository.save({
          mensaje: message.message,
          idCampania: idCampaign,
          estadoEnvio: 1,
        });
      }
      return 'Messages created successfully';
    } catch (error) {
      console.log(error);
      throw new Error('Error creating message');
    }
  }

  async findActiveMessages(filterMessageDto: FilterMessageDto) {
    try {
      const { month, clientId } = filterMessageDto;
      const results = await buildAndExecuteQuery(
        this.messageRepository,
        month,
        clientId,
      );

      const groupedMessages = {
        pendientes: [],
        enviados: [],
        error: [],
      };

      results.forEach((result) => {
        const estadoEnvio = parseInt(result.estadoEnvio, 10);
        const message = result.mensaje;
        const campaignName = result.campaignName;
        const userName = result.userName;

        const messageData = { message, campaignName, userName };

        if (estadoEnvio === 1) {
          groupedMessages.pendientes.push(messageData);
        } else if (estadoEnvio === 2) {
          groupedMessages.enviados.push(messageData);
        } else if (estadoEnvio === 3) {
          groupedMessages.error.push(messageData);
        }
      });

      return groupedMessages;
    } catch (error) {
      console.log(error);
      throw new Error('Error finding active messages');
    }
  }
  findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: number): Promise<Message> {
    const findMessage = await this.messageRepository.findOne({
      where: { idMensaje: id },
    });

    if (!findMessage) {
      throw new Error('Message not found');
    }

    return findMessage;
  }

  async update(id: number) {
    const findMessage = await this.findOne(id);
    if (!findMessage) {
      throw new Error('Message not found');
    }
    try {
      await this.messageRepository.update(id, {
        ...findMessage,
        estadoEnvio: 2,
      });
      return findMessage;
    } catch (error) {
      console.log(error);
      this.messageRepository.update(id, { estadoEnvio: 3 });
      throw new Error('Error updating message');
    }
  }

  async remove(id: number) {
    const findMessage = await this.findOne(id);
    if (!findMessage) {
      throw new Error('Message not found');
    }
    this.messageRepository.update(id, { estado: false });
    return { message: 'Message deleted successfully' };
  }
}

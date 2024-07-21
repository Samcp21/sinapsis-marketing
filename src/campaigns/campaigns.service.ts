import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateCampaignProgramDto } from './dto/create-campaign-program.dto';
import { User } from '../auth/entities/user.entity';
import { Message } from '../messages/entities/message.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,

    @InjectRepository(User)
    private readonly us: Repository<User>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(createCampaignDto: CreateCampaignDto, user: User) {
    try {
      const { usuario } = user;

      const findUser = await this.us.findOne({ where: { usuario: usuario } });
      return this.campaignRepository.save({
        ...createCampaignDto,
        idUsuario: findUser.idUsuario,
      });
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async programCampaign(
    createCampaignProgramDto: CreateCampaignProgramDto,
    user: User,
  ) {
    try {
      const { usuario } = user;
      const { campania, fechaHoraProgramacion, messages } =
        createCampaignProgramDto;
      const findUser = await this.us.findOne({ where: { usuario: usuario } });

      const createCampaign = await this.campaignRepository.save({
        nombre: campania,
        idUsuario: findUser.idUsuario,
        fechaHoraProgramacion,
      });

      messages.map((msg) => {
        return this.messageRepository.save({
          mensaje: msg.message,
          idCampania: createCampaign.idCampania,
          estadoEnvio: 1,
        });
      });

      return {
        message: 'Campaña programada con éxito',
      };
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  findAll() {
    return this.campaignRepository.find();
  }

  findOne(id: number) {
    try {
      const findCampaign = this.campaignRepository.findOne({
        where: { idCampania: id },
      });
      if (!findCampaign) {
        throw new Error('Campaña no encontrada');
      }
      return findCampaign;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  remove(id: number) {
    try {
      const findCampaign = this.findOne(id);
      if (!findCampaign) {
        throw new Error('Campaña no encontrada');
      }
      this.campaignRepository.update({ idCampania: id }, { estado: false });
      return {
        message: 'Campaña eliminada con éxito',
      };
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }
  private handleError(error: any): never {
    if (error.code == 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);
    throw new InternalServerErrorException('Please check server logs');
  }
}

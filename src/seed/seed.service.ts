import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  campaignData,
  clientData,
  messageData,
  usersData,
} from './data/client-data';
import { User } from '@/auth/entities/user.entity';
import { Client } from '@/clients/entities/client.entity';
import { Message } from '@/messages/entities/message.entity';
import { Campaign } from '@/campaigns/entities/campaign.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  async runSeed() {
    await this.clearTables();
    await this.seedClients();
    await this.seedUsers();
    await this.seedCampaigns();
    await this.seedMessages();
    return 'SEED EXECUTED';
  }

  private async clearTables() {
    await this.clientRepository.query('DELETE FROM client');
    await this.userRepository.query('DELETE FROM user');
    await this.messageRepository.query('DELETE FROM message');
    await this.campaignRepository.query('DELETE FROM campaign');
  }
  private async seedClients() {
    const existingClients = await this.clientRepository.find();
    if (existingClients.length === 0) {
      await this.clientRepository.save(clientData);
    } else {
      console.log('Clients already seeded');
    }
  }
  private async seedUsers() {
    const existingUsers = await this.userRepository.find();
    if (existingUsers.length === 0) {
      const clients = await this.clientRepository.find();
      const clientMap = new Map(
        clients.map((client) => [client.idCliente, client]),
      );

      const usersWithClient = usersData.map((user) => {
        const client = clientMap.get(user.idCliente);
        if (!client) {
          throw new Error(`Client with ID ${user.idCliente} not found`);
        }
        return {
          ...user,
          idCliente: client,
        };
      });

      await this.userRepository.save(usersWithClient);
    } else {
      console.log('Users already seeded');
    }
  }
  private async seedCampaigns() {
    const existingCampaigns = await this.campaignRepository.find();
    if (existingCampaigns.length === 0) {
      const users = await this.userRepository.find();
      const userMap = new Map(users.map((user) => [user.idUsuario, user]));

      const campaignsWithUser = campaignData.map((campaign) => {
        const user = userMap.get(campaign.idUsuario);
        if (!user) {
          throw new Error(`User with ID ${campaign.idUsuario} not found`);
        }
        return {
          ...campaign,
          idUsuario: user.idUsuario,
        };
      });

      await this.campaignRepository.save(campaignsWithUser);
    } else {
      console.log('Campaigns already seeded');
    }
  }
  private async seedMessages() {
    const existingMessages = await this.messageRepository.find();
    if (existingMessages.length === 0) {
      const campaigns = await this.campaignRepository.find();
      const campaignMap = new Map(
        campaigns.map((campaign) => [campaign.idCampania, campaign]),
      );

      const messagesWithCampaign = messageData.map((message) => {
        const campaign = campaignMap.get(message.idCampania);
        if (!campaign) {
          throw new Error(`Campaign with ID ${message.idCampania} not found`);
        }
        return {
          ...message,
          idCampania: campaign.idCampania,
        };
      });

      await this.messageRepository.save(messagesWithCampaign);
    } else {
      console.log('Messages already seeded');
    }
  }
}

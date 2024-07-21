import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilterMessageDto } from './dto/filter-message.dto';
import { Campaign } from '../campaigns/entities/campaign.entity';

describe('MessagesService', () => {
  let service: MessagesService;
  let messageRepository: Repository<Message>;
  let campaignRepository: Repository<Campaign>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(Message),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Campaign),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
    messageRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message),
    );
    campaignRepository = module.get<Repository<Campaign>>(
      getRepositoryToken(Campaign),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create messages', async () => {
      const createMessageDto: CreateMessageDto = {
        idCampaign: 1,
        messages: [{ message: 'Test message' }],
      };

      jest
        .spyOn(campaignRepository, 'findOne')
        .mockResolvedValue({ idCampania: 1 } as Campaign);
      jest.spyOn(messageRepository, 'save').mockResolvedValue({} as Message);

      await expect(service.create(createMessageDto)).resolves.toEqual(
        'Messages created successfully',
      );
    });

    it('should throw error if campaign not found', async () => {
      const createMessageDto: CreateMessageDto = {
        idCampaign: 1,
        messages: [{ message: 'Test message' }],
      };

      jest.spyOn(campaignRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createMessageDto)).rejects.toThrow(
        'Campaign not found',
      );
    });

    it('should throw error if message is empty', async () => {
      const createMessageDto: CreateMessageDto = {
        idCampaign: 1,
        messages: [{ message: '' }],
      };

      jest
        .spyOn(campaignRepository, 'findOne')
        .mockResolvedValue({ idCampania: 1 } as Campaign);

      await expect(service.create(createMessageDto)).rejects.toThrow(
        'Message is required',
      );
    });
  });

  describe('findActiveMessages', () => {
    it('should return grouped messages', async () => {
      const filterMessageDto: FilterMessageDto = { month: '7', clientId: '1' };
      const results = [
        {
          estadoEnvio: '1',
          mensaje: 'Test message 1',
          campaignName: 'Campaign 1',
          userName: 'User 1',
        },
        {
          estadoEnvio: '2',
          mensaje: 'Test message 2',
          campaignName: 'Campaign 2',
          userName: 'User 2',
        },
      ];

      jest.spyOn(service, 'findActiveMessages').mockResolvedValue({
        pendientes: [
          {
            message: 'Test message 1',
            campaignName: 'Campaign 1',
            userName: 'User 1',
          },
        ],
        enviados: [
          {
            message: 'Test message 2',
            campaignName: 'Campaign 2',
            userName: 'User 2',
          },
        ],
        error: [],
      });

      await expect(
        service.findActiveMessages(filterMessageDto),
      ).resolves.toEqual({
        pendientes: [
          {
            message: 'Test message 1',
            campaignName: 'Campaign 1',
            userName: 'User 1',
          },
        ],
        enviados: [
          {
            message: 'Test message 2',
            campaignName: 'Campaign 2',
            userName: 'User 2',
          },
        ],
        error: [],
      });
    });
  });

  describe('findOne', () => {
    it('should return a message by id', async () => {
      const message = { idMensaje: 1, mensaje: 'Test message' };
      jest
        .spyOn(messageRepository, 'findOne')
        .mockResolvedValue(message as Message);

      await expect(service.findOne(1)).resolves.toEqual(message);
    });

    it('should throw error if message not found', async () => {
      jest.spyOn(messageRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Message not found');
    });
  });

  describe('update', () => {
    it('should update the message status', async () => {
      const message = { idMensaje: 1, mensaje: 'Test message', estadoEnvio: 1 };
      jest.spyOn(service, 'findOne').mockResolvedValue(message as Message);
      jest.spyOn(messageRepository, 'update').mockResolvedValue(undefined);

      await expect(service.update(1)).resolves.toEqual(message);
    });

    it('should throw error if message not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.update(1)).rejects.toThrow('Message not found');
    });
  });

  describe('remove', () => {
    it('should remove the message', async () => {
      const message = { idMensaje: 1, mensaje: 'Test message' };
      jest.spyOn(service, 'findOne').mockResolvedValue(message as Message);
      jest.spyOn(messageRepository, 'update').mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toEqual({
        message: 'Message deleted successfully',
      });
    });

    it('should throw error if message not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow('Message not found');
    });
  });
});

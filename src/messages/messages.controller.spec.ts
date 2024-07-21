import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilterMessageDto } from './dto/filter-message.dto';

describe('MessagesController', () => {
  let controller: MessagesController;
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useValue: {
            create: jest.fn(),
            findActiveMessages: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
    service = module.get<MessagesService>(MessagesService);
  });

  describe('create', () => {
    it('should create a new message', async () => {
      const createMessageDto: CreateMessageDto = {
        idCampaign: 1,
        messages: [{ message: 'Message 1' }],
      };

      jest.spyOn(service, 'create').mockResolvedValue(createMessageDto as any);

      expect(await controller.create(createMessageDto)).toEqual(
        createMessageDto,
      );
    });
  });

  describe('findActive', () => {
    it('should return active messages based on filter', async () => {
      const filterMessageDto: FilterMessageDto = { month: '2024-09' };
      const result = { pendientes: [], enviados: [], error: [] };

      jest.spyOn(service, 'findActiveMessages').mockResolvedValue(result);

      expect(await controller.findActive(filterMessageDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all messages', async () => {
      const result = [];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a message by id', async () => {
      const id = '1';
      const result = { message: 'Message 1' };

      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a message by id', async () => {
      const id = '1';
      const result = { message: 'Message 1' };

      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(id)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a message by id', async () => {
      const id = '1';
      const result = undefined;

      jest.spyOn(service, 'remove').mockResolvedValue(result);

      expect(await controller.remove(id)).toEqual(result);
    });
  });
});

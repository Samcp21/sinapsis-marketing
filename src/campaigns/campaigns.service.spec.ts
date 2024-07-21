import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsService } from './campaigns.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { User } from '../auth/entities/user.entity';
import { Message } from '../messages/entities/message.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateCampaignProgramDto } from './dto/create-campaign-program.dto';

describe('CampaignsService', () => {
  let service: CampaignsService;
  let campaignRepository: Repository<Campaign>;
  let userRepository: Repository<User>;
  let messageRepository: Repository<Message>;

  const mockCampaignRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockMessageRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignsService,
        {
          provide: getRepositoryToken(Campaign),
          useValue: mockCampaignRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
      ],
    }).compile();

    service = module.get<CampaignsService>(CampaignsService);
    campaignRepository = module.get<Repository<Campaign>>(
      getRepositoryToken(Campaign),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    messageRepository = module.get<Repository<Message>>(
      getRepositoryToken(Message),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a campaign', async () => {
      const dto: CreateCampaignDto = {
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
      };
      const user: User = { idUsuario: 1, usuario: 'user1' } as User;
      const savedCampaign = {
        idCampania: 1,
        ...dto,
        idUsuario: user.idUsuario,
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockCampaignRepository.save.mockResolvedValue(savedCampaign);

      expect(await service.create(dto, user)).toEqual(savedCampaign);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { usuario: 'user1' },
      });
      expect(campaignRepository.save).toHaveBeenCalledWith({
        ...dto,
        idUsuario: user.idUsuario,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of campaigns', async () => {
      const campaigns = [
        {
          idCampania: 1,
          nombre: 'Campaign 1',
          fechaHoraProgramacion: new Date(),
          estado: true,
        },
      ];
      mockCampaignRepository.find.mockResolvedValue(campaigns);

      expect(await service.findAll()).toEqual(campaigns);
      expect(campaignRepository.find).toHaveBeenCalled();
    });
  });

  describe('programCampaign', () => {
    it('should program a campaign', async () => {
      const dto: CreateCampaignProgramDto = {
        campania: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
        messages: [{ message: 'Message 1' }],
      };
      const user: User = { idUsuario: 1, usuario: 'user1' } as User;
      const savedCampaign = {
        idCampania: 1,
        nombre: dto.campania,
        idUsuario: user.idUsuario,
        fechaHoraProgramacion: dto.fechaHoraProgramacion,
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockCampaignRepository.save.mockResolvedValue(savedCampaign);
      mockMessageRepository.save.mockResolvedValue({
        idMensaje: 1,
        mensaje: 'Message 1',
        idCampania: 1,
        estadoEnvio: 1,
      });

      expect(await service.programCampaign(dto, user)).toEqual({
        message: 'Campaña programada con éxito',
      });

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { usuario: 'user1' },
      });
      expect(campaignRepository.save).toHaveBeenCalledWith({
        nombre: dto.campania,
        idUsuario: user.idUsuario,
        fechaHoraProgramacion: dto.fechaHoraProgramacion,
      });
      expect(messageRepository.save).toHaveBeenCalledWith({
        mensaje: 'Message 1',
        idCampania: 1,
        estadoEnvio: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a campaign by id', async () => {
      const campaign = {
        idCampania: 1,
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
        estado: true,
      };
      mockCampaignRepository.findOne.mockResolvedValue(campaign);

      expect(await service.findOne(1)).toEqual(campaign);
      expect(campaignRepository.findOne).toHaveBeenCalledWith({
        where: { idCampania: 1 },
      });
    });
  });

  describe('remove', () => {
    it('should remove a campaign', async () => {
      const campaign = {
        idCampania: 1,
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
        estado: true,
      };
      mockCampaignRepository.findOne.mockResolvedValue(campaign);
      mockCampaignRepository.update.mockResolvedValue({ affected: 1 });

      expect(await service.remove(1)).toEqual({
        message: 'Campaña eliminada con éxito',
      });

      expect(campaignRepository.findOne).toHaveBeenCalledWith({
        where: { idCampania: 1 },
      });
      expect(campaignRepository.update).toHaveBeenCalledWith(
        { idCampania: 1 },
        { estado: false },
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { JwtService } from '@nestjs/jwt';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CreateCampaignProgramDto } from './dto/create-campaign-program.dto';
import { User } from '../auth/entities/user.entity';

describe('CampaignsController', () => {
  let controller: CampaignsController;
  let service: CampaignsService;

  const mockCampaignsService = {
    create: jest
      .fn()
      .mockImplementation((dto: CreateCampaignDto, user: User) => {
        return { id: 1, ...dto, idUsuario: user.idUsuario };
      }),
    findAll: jest.fn().mockResolvedValue([
      {
        idCampania: 1,
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date('2024-07-21T17:28:15.832Z'),
        estado: true,
      },
    ]),
    programCampaign: jest
      .fn()
      .mockImplementation((dto: CreateCampaignProgramDto, user: User) => {
        return { message: 'Campaña programada con éxito' };
      }),
    findOne: jest.fn().mockImplementation((id: number) => {
      return {
        idCampania: id,
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
        estado: true,
      };
    }),
    remove: jest.fn().mockImplementation((id: number) => {
      return { message: 'Campaña eliminada con éxito' };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        { provide: CampaignsService, useValue: mockCampaignsService },
        JwtService,
      ],
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
    service = module.get<CampaignsService>(CampaignsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a campaign', async () => {
      const dto: CreateCampaignDto = {
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
      };
      const req = { user: { idUsuario: 1, usuario: 'user1' } };

      expect(await controller.create(dto, req)).toEqual({
        id: expect.any(Number),
        ...dto,
        idUsuario: 1,
      });

      expect(service.create).toHaveBeenCalledWith(dto, req.user);
    });
  });

  describe('findAll', () => {
    it('should return an array of campaigns', async () => {
      expect(await controller.findAll()).toMatchObject([
        {
          idCampania: 1,
          nombre: 'Campaign 1',
          estado: true,
        },
      ]);

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('programCampaign', () => {
    it('should program a campaign', async () => {
      const dto: CreateCampaignProgramDto = {
        campania: 'Campaign 1',
        fechaHoraProgramacion: new Date(),
        messages: [{ message: 'Message 1' }],
      };
      const req = { user: { idUsuario: 1, usuario: 'user1' } };

      expect(await controller.programCampaign(dto, req)).toEqual({
        message: 'Campaña programada con éxito',
      });

      expect(service.programCampaign).toHaveBeenCalledWith(dto, req.user);
    });
  });

  describe('findOne', () => {
    it('should return a campaign by id', async () => {
      const campaign = {
        idCampania: 1,
        nombre: 'Campaign 1',
        fechaHoraProgramacion: new Date('2024-07-21T17:35:36.779Z'),
        estado: true,
      };

      mockCampaignsService.findOne.mockResolvedValue(campaign);

      const result = await controller.findOne('1');
      expect(result.idCampania).toBe(1);
      expect(result.nombre).toBe('Campaign 1');
      expect(result.fechaHoraProgramacion.toISOString()).toBe(
        '2024-07-21T17:35:36.779Z',
      );
      expect(result.estado).toBe(true);
    });
  });
  describe('remove', () => {
    it('should remove a campaign', async () => {
      expect(await controller.remove('1')).toEqual({
        message: 'Campaña eliminada con éxito',
      });

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

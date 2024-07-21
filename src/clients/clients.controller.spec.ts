import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createClientDto: CreateClientDto = {
        nombre: 'Client 1',
      };

      const result = { idCliente: 1, ...createClientDto };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(createClientDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      const result = [
        { idCliente: 1, nombre: 'Client 1', estado: true },
        { idCliente: 2, nombre: 'Client 2', estado: false },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });
});

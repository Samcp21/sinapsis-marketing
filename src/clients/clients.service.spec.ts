import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository, UpdateResult } from 'typeorm';

const mockClient: Client = { idCliente: 1, nombre: 'Client 1', estado: true };
const createClientDto = { nombre: 'Client 1' };

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  describe('create', () => {
    it('should create a new client', async () => {
      jest.spyOn(repository, 'save').mockResolvedValue(mockClient);
      expect(await service.create(createClientDto)).toEqual(mockClient);
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockClient]);
      expect(await service.findAll()).toEqual([mockClient]);
    });
  });
});

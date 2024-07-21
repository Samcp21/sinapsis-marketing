import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let clientRepository: Repository<Client>;
  let jwtService: JwtService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const mockClientRepository = {
    findOneBy: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
        { provide: getRepositoryToken(Client), useValue: mockClientRepository },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    clientRepository = module.get<Repository<Client>>(
      getRepositoryToken(Client),
    );
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('create', () => {
    it('should create a user and return a token', async () => {
      const createUserDto: CreateUserDto = {
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
      };

      const client = new Client();
      client.idCliente = 1;

      const user = new User();
      user.idUsuario = 1;
      user.usuario = 'testuser';
      user.password = bcrypt.hashSync('password123', 10);
      user.idCliente = client;

      jest.spyOn(clientRepository, 'findOneBy').mockResolvedValue(client);
      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await authService.create(createUserDto);

      expect(result).toEqual({ ...user, token: 'token' });
    });

    it('should throw BadRequestException if client is not found', async () => {
      const createUserDto: CreateUserDto = {
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
      };

      jest
        .spyOn(clientRepository, 'findOneBy')
        .mockRejectedValue(new BadRequestException('Invalid client'));
      await expect(authService.create(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should handle server errors correctly', async () => {
      const createUserDto: CreateUserDto = {
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
      };

      jest.spyOn(clientRepository, 'findOneBy').mockImplementation(() => {
        throw new Error('Server Error');
      });

      await expect(authService.create(createUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('login', () => {
    it('should log in a user and return a token', async () => {
      const loginUserDto: LoginUserDto = {
        usuario: 'testuser',
        password: 'password123',
      };

      const user = new User();
      user.idUsuario = 1;
      user.usuario = 'testuser';
      user.password = bcrypt.hashSync('password123', 10);

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await authService.login(loginUserDto);

      expect(result).toEqual({ ...user, token: 'token' });
    });

    it('should throw BadRequestException if credentials are invalid', async () => {
      const loginUserDto: LoginUserDto = {
        usuario: 'testuser',
        password: 'wrongpassword',
      };

      const user = new User();
      user.idUsuario = 1;
      user.usuario = 'testuser';
      user.password = bcrypt.hashSync('password123', 10);

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      await expect(authService.login(loginUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should handle server errors correctly', async () => {
      const loginUserDto: LoginUserDto = {
        usuario: 'testuser',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'findOne').mockImplementation(() => {
        throw new Error('Server Error');
      });

      await expect(authService.login(loginUserDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});

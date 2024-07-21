import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    create: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
      };

      mockAuthService.create.mockResolvedValue({
        idUsuario: 1,
        ...createUserDto,
        token: 'someToken',
      });

      expect(await authController.createUser(createUserDto)).toEqual({
        idUsuario: 1,
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
        token: 'someToken',
      });
      expect(mockAuthService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should throw BadRequestException when service throws an error', async () => {
      const createUserDto: CreateUserDto = {
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
      };

      mockAuthService.create.mockRejectedValue(
        new BadRequestException('Invalid client'),
      );

      await expect(authController.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockAuthService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('loginUser', () => {
    it('should login a user', async () => {
      const loginUserDto: LoginUserDto = {
        usuario: 'testuser',
        password: 'password123',
      };

      mockAuthService.login.mockResolvedValue({
        idUsuario: 1,
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
        token: 'someToken',
      });

      expect(await authController.loginUser(loginUserDto)).toEqual({
        idUsuario: 1,
        idCliente: 1,
        usuario: 'testuser',
        password: 'password123',
        token: 'someToken',
      });
      expect(mockAuthService.login).toHaveBeenCalledWith(loginUserDto);
    });

    it('should throw BadRequestException when service throws an error', async () => {
      const loginUserDto: LoginUserDto = {
        usuario: 'testuser',
        password: 'password123',
      };

      mockAuthService.login.mockRejectedValue(
        new BadRequestException('Invalid credentials'),
      );

      await expect(authController.loginUser(loginUserDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(loginUserDto);
    });
  });
});

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interface/jwt-payload.interfaces';
import { JwtService } from '@nestjs/jwt';
import { Client } from '../clients/entities/client.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { idCliente, usuario, password } = createUserDto;
      const client = await this.clientRepository.findOneBy({
        idCliente: idCliente,
      });
      if (!client) throw new BadRequestException('Invalid client');
      const user = this.userRepository.create({
        usuario: usuario,
        password: bcrypt.hashSync(password, 10),
        idCliente: client,
      });
      await this.userRepository.save(user);
      return { ...user, token: this.getJwtToken({ username: usuario }) };
    } catch (error) {
      this.handleError(error);
    }
  }

  async login(loginUserDto: any) {
    try {
      const { usuario, password } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { usuario: usuario },
      });
      if (!user) throw new BadRequestException('Invalid credentials');
      if (!bcrypt.compareSync(password, user.password))
        throw new BadRequestException('Invalid credentials');
      return { ...user, token: this.getJwtToken({ username: usuario }) };
    } catch (error) {
      this.handleError(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleError(error: any): never {
    if (error instanceof BadRequestException) {
      throw error;
    }
    if (error.code == 'ER_DUP_ENTRY') {
      throw new BadRequestException(error.sqlMessage);
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}

import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      return await this.clientRepository.save(createClientDto);
    } catch (error) {
      console.log(error);
      throw new Error('Error creating client');
    }
  }
  findAll() {
    return this.clientRepository.find();
  }
  remove(id: number) {
    try {
      const findClient = this.clientRepository.findOne({
        where: { idCliente: id },
      });
      if (!findClient) {
        throw new Error('Client not found');
      }
      this.clientRepository.update(id, { estado: false });
      return { message: 'Client deleted successfully' };
    } catch (error) {
      console.log(error);
      throw new Error('Error deleting client');
    }
  }
}

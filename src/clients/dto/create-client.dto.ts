import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'The name of the client',
    type: String,
    default: 'Client 1',
  })
  @IsString()
  nombre: string;
}

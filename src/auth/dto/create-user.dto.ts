import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  isString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The id of the client',
    type: Number,
  })
  @IsNumber()
  idCliente: number;
  @ApiProperty({
    description: 'The username of the user',
    type: String,
  })
  @IsString()
  usuario: string;
  @ApiProperty({
    description: 'The password of the user',
    type: String,
  })
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'The password can only contain letters and numbers',
  })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCampaignDto {
  @ApiProperty({
    description: 'The name of the campaign',
    type: String,
    default: 'Campaign 1',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre: string;

  @ApiProperty({
    description: 'the date of the campaign',
    type: Date,
    default: '2024-09-01',
  })
  @IsDateString()
  @IsNotEmpty()
  fechaHoraProgramacion: Date;
}

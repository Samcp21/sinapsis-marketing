import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCampaignProgramDto {
  @ApiProperty({
    description: 'The name of the campaign',
    type: String,
    default: 'Campaign 1',
  })
  @IsString()
  @IsNotEmpty()
  campania: string;

  @ApiProperty({
    description: 'The date and time of the campaign',
    type: Date,
    default: '2024-09-01',
  })
  @IsDateString()
  @IsNotEmpty()
  fechaHoraProgramacion: Date;

  @ApiProperty({
    description: 'The messages of the campaign',
    type: Array,
    default: [{ message: 'Message 1' }],
  })
  @IsNotEmpty()
  @IsArray()
  messages: { message: string }[];
}

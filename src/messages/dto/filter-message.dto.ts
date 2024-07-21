import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterMessageDto {
  @ApiProperty({
    description: 'The year of the message',
    type: String,
    default: '2024-09',
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  month: string;

  @ApiPropertyOptional({
    description: 'The clientId of the message',
    type: String,
  })
  @IsString()
  @IsOptional()
  clientId?: string;
}

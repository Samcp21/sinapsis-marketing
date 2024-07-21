import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

class Message {
  @ApiProperty({
    description: 'The content of the message',
    type: String,
    example: 'Message 1',
  })
  @IsString()
  message: string;
}

export class CreateMessageDto {
  @ApiProperty({
    description: 'The id of the campaign',
    type: Number,
    default: 1,
  })
  @IsNumber()
  idCampaign: number;

  @ApiProperty({
    description: 'The messages to send',
    type: [Message],
    example: [{ message: 'Message 1' }],
  })
  @IsArray()
  messages: Message[];
}

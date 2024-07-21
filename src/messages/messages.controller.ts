import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilterMessageDto } from './dto/filter-message.dto';

@ApiTags('Mensajes')
@ApiBearerAuth()
@Controller('messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateMessageDto,
  })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get('active')
  @ApiResponse({
    status: 200,
    description: 'Get all active messages, messages are filtered by the date of the campaign to which the message belongs and can also be filtered by the idClient. ',
    type: FilterMessageDto,
  })
  findActive(@Query() filterMessageDto: FilterMessageDto) {
    return this.messagesService.findActiveMessages(filterMessageDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all messages',
  })
  findAll() {
    return this.messagesService.findAll();
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get a message by id',
  })
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(@Param('id') id: string) {
    return this.messagesService.update(+id);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}

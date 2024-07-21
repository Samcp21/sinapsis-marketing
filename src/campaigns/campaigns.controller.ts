import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
  Request,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CreateCampaignProgramDto } from './dto/create-campaign-program.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Campanias')
@ApiBearerAuth()
@Controller('campaigns')
@UseGuards(AuthGuard('jwt'))
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The campaign has been successfully created.',
    type: CreateCampaignDto,
  })
  create(@Body() createCampaignDto: CreateCampaignDto, @Request() req) {
    const { user } = req;

    return this.campaignsService.create(createCampaignDto, user);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all campaigns',
  })
  findAll() {
    return this.campaignsService.findAll();
  }
  @Post('program')
  @ApiResponse({
    status: 201,
    description:
      'Successfully programmed campaign with a message to distribute',
    type: CreateCampaignProgramDto,
  })
  programCampaign(
    @Body() createCampaignProgramDto: CreateCampaignProgramDto,
    @Request() req,
  ) {
    const { user } = req;
    return this.campaignsService.programCampaign(
      createCampaignProgramDto,
      user,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get campaign by id',
  })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(+id);
  }
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The campaign has been successfully removed.',
  })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }
}

import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { Campaign } from './entities/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@/auth/auth.module';
import { Message } from '@/messages/entities/message.entity';
import { User } from '@/auth/entities/user.entity';

@Module({
  controllers: [CampaignsController],
  providers: [CampaignsService],
  imports: [TypeOrmModule.forFeature([Campaign, User, Message]), AuthModule],
})
export class CampaignsModule {}

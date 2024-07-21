import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '@/clients/entities/client.entity';
import { User } from '@/auth/entities/user.entity';
import { Campaign } from '@/campaigns/entities/campaign.entity';
import { Message } from '@/messages/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User, Campaign, Message])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}

import { Module } from '@nestjs/common';
import { SayingsService } from './sayings.service';
import { SayingsController } from './sayings.controller';
import { PrismaService } from '../database/PrismaService';

@Module({
  controllers: [SayingsController],
  providers: [SayingsService, PrismaService],
})
export class SayingsModule {}

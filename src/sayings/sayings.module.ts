import { Module } from '@nestjs/common';
import { SayingsService } from './sayings.service';
import { SayingsController } from './sayings.controller';
import { PrismaService } from '../database/PrismaService';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [SayingsController],
  providers: [SayingsService, PrismaService, UsersService],
})
export class SayingsModule {}

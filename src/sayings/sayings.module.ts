import { Module } from '@nestjs/common';
import { SayingsService } from './sayings.service';
import { SayingsController } from './sayings.controller';

@Module({
  controllers: [SayingsController],
  providers: [SayingsService]
})
export class SayingsModule {}

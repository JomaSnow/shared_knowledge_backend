import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SayingsModule } from './sayings/sayings.module';

@Module({
  imports: [SayingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SayingsModule } from './sayings/sayings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SayingsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

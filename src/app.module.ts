import { Module } from '@nestjs/common';
import { SayingsModule } from './sayings/sayings.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SayingsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

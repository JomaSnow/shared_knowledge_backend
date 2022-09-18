/* eslint-disable prettier/prettier */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDTO } from '../users/dto/createUser.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if (params.action == 'create' && params.model == 'Users') {
        const user: CreateUserDTO = params.args.data;
        const salt = genSaltSync(10);
        const hashedPassoword = hashSync(user.password, salt);
        user.password = hashedPassoword;
        params.args.data = user;
      }
      return next(params);
    });
  }

  async enableShutDownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

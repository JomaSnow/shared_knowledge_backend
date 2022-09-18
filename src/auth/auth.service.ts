import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  async validateUser(email: string, password: string) {
    let user: Users;
    try {
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Users } from '@prisma/client';
import { Strategy } from 'passport-local';
import { MessageValidator } from '../../helper/validators';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user: Users = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(MessageValidator.invalidAuthMessage);
    }

    return user;
  }
}

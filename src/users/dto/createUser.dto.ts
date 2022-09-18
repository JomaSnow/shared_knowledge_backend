import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { MessageValidator, RegexValidator } from '../../helper/validators';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @Matches(RegexValidator.password, {
    message: MessageValidator.invalidPasswordMessage,
  })
  password: string;

  role: Role;
}

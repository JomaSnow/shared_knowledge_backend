import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { RegexValidator } from '../../helper/validators';

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
  @Matches(RegexValidator.password)
  password: string;

  role: Role;
}

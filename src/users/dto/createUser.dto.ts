import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Role } from '../../helper/enums/roles.enum';
import { MessageValidator, RegexValidator } from '../../helper/validators';

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

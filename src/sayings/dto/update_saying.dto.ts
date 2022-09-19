import { IsNotEmpty } from 'class-validator';

export class UpdateSayingDTO {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  date: Date;
}

import { IsNotEmpty } from 'class-validator';

export class CreateSayingDTO {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  date: Date;
}

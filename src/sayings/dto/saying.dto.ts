import { IsNotEmpty } from 'class-validator';

export class SayingDTO {
  id?: string;
  
  @IsNotEmpty()
  message: string;
  
  @IsNotEmpty()
  author: string;
  
  @IsNotEmpty()
  date: Date;
  
  @IsNotEmpty()
  created_at: Date;
}

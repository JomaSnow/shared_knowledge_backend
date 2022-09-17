import { PartialType } from '@nestjs/mapped-types';
import { CreateSayingDto } from './create-saying.dto';

export class UpdateSayingDto extends PartialType(CreateSayingDto) {}

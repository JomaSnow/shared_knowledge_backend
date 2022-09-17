import { Injectable } from '@nestjs/common';
import { CreateSayingDto } from './dto/create-saying.dto';
import { UpdateSayingDto } from './dto/update-saying.dto';

@Injectable()
export class SayingsService {
  create(createSayingDto: CreateSayingDto) {
    return 'This action adds a new saying';
  }

  findAll() {
    return `This action returns all sayings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saying`;
  }

  update(id: number, updateSayingDto: UpdateSayingDto) {
    return `This action updates a #${id} saying`;
  }

  remove(id: number) {
    return `This action removes a #${id} saying`;
  }
}

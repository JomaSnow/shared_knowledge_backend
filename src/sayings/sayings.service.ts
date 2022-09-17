import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { SayingDTO } from './dto/saying.dto';

@Injectable()
export class SayingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: SayingDTO) {
    const saying = await this.prisma.sayings.create({
      data,
    });

    return saying;
  }

  // create(createSayingDto: CreateSayingDto) {
  //   return 'This action adds a new saying';
  // }

  // findAll() {
  //   return `This action returns all sayings`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} saying`;
  // }

  // update(id: number, updateSayingDto: UpdateSayingDto) {
  //   return `This action updates a #${id} saying`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} saying`;
  // }
}

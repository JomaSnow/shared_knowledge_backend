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

  async findAll() {
    return await this.prisma.sayings.findMany();
  }

  async findOne(id: string) {
    const saying = await this.prisma.sayings.findUnique({
      where: {
        id,
      },
    });

    if (!saying) {
      return { errorMsg: 'Este ditado não existe.' };
    }

    return saying;
  }

  async update(id: string, data: SayingDTO) {
    const saying = await this.prisma.sayings.findUnique({
      where: {
        id,
      },
    });

    if (!saying) {
      return { errorMsg: 'Este ditado não existe.' };
    }

    return await this.prisma.sayings.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const saying = await this.prisma.sayings.findUnique({
      where: {
        id,
      },
    });

    if (!saying) {
      return { errorMsg: 'Este ditado não existe.' };
    }

    return await this.prisma.sayings.delete({
      where: {
        id,
      },
    });
  }
}

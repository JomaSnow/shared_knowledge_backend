import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { SayingDTO } from './dto/saying.dto';

@Injectable()
export class SayingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: SayingDTO) {
    const saying = await this.prisma.sayings
      .create({
        data,
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao criar este Ditado. Erro: ${e}`,
          502,
        );
      });

    return saying;
  }

  async findAll() {
    return await this.prisma.sayings
      .findMany()
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao resgatar Ditados. Erro: ${e}`,
          502,
        );
      });
  }

  async findOne(id: string) {
    const saying = await this.prisma.sayings
      .findUnique({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao resgatar este Ditado. Erro: ${e}`,
          502,
        );
      });

    if (!saying) {
      throw new HttpException('Ditado não encontrado. Ele não existe.', 404);
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
      throw new HttpException('Ditado não encontrado. Ele não existe.', 404);
    }

    return await this.prisma.sayings
      .update({
        data,
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao atualizar este Ditado. Erro: ${e}`,
          502,
        );
      });
  }

  async remove(id: string) {
    const saying = await this.prisma.sayings.findUnique({
      where: {
        id,
      },
    });

    if (!saying) {
      throw new HttpException('Ditado não encontrado. Ele não existe.', 404);
    }

    await this.prisma.sayings
      .delete({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao remover este Ditado. Erro: ${e}`,
          502,
        );
      })
      .finally(() => {
        throw new HttpException(`Ditado removido.`, 200);
      });
  }
}

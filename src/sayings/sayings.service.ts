import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../database/PrismaService';
import { CreateSayingDTO } from './dto/create_saying.dto';
import { UpdateSayingDTO } from './dto/update_saying.dto';

@Injectable()
export class SayingsService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async create(request, data: CreateSayingDTO) {
    const user = await this.usersService
      .findOne(request, request.user.id)
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao buscar autor. Erro: ${e}`,
          502,
        );
      });
    data = { ...data, authorId: user.id };

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
    return await this.prisma.sayings.findMany().catch((e) => {
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

  async findAllFromAuthor(id: string) {
    const userWithSayings = await this.prisma.users
      .findUnique({
        where: { id },
        include: {
          sayings: true,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao resgatar os ditados. Erro: ${e}`,
          502,
        );
      });

    if (!userWithSayings) throw new HttpException('Usuário não existe.', 404);

    return userWithSayings.sayings;
  }

  async update(request, id: string, data: UpdateSayingDTO) {
    const author = await this.usersService
      .findOne(request, request.user.id)
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao buscar autor. Erro: ${e}`,
          502,
        );
      });

    const saying = await this.prisma.sayings.findUnique({
      where: {
        id,
      },
    });

    if (!saying) {
      throw new HttpException('Ditado não encontrado. Ele não existe.', 404);
    }

    if (author.id !== saying.authorId && author.role !== 'ADMIN') {
      throw new HttpException(
        `Você não tem permissão para modificar este ditado.`,
        401,
      );
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

  async remove(request, id: string) {
    const author = await this.usersService
      .findOne(request, request.user.id)
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao buscar autor. Erro: ${e}`,
          502,
        );
      });

    const saying = await this.prisma.sayings.findUnique({
      where: {
        id,
      },
    });

    if (!saying) {
      throw new HttpException('Ditado não encontrado. Ele não existe.', 404);
    }

    if (author.id !== saying.authorId && author.role !== 'ADMIN') {
      throw new HttpException(
        `Você não tem permissão para remover este ditado.`,
        401,
      );
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

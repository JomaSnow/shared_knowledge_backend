import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/PrismaService';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    const userWithEmail = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userWithEmail) {
      throw new HttpException('E-mail já cadastrado', 409);
    }

    const user = await this.prisma.users
      .create({
        data,
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao criar este usuário. Erro: ${e}`,
          502,
        );
      });

    return user;
  }

  async findAll() {
    return await this.prisma.users
      .findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          created_at: true,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao resgatar usuários. Erro: ${e}`,
          502,
        );
      });
  }

  async findOne(id: string) {
    const user = await this.prisma.users
      .findUnique({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao resgatar este usuário. Erro: ${e}`,
          502,
        );
      });

    if (!user) {
      throw new HttpException('Usuário não encontrado. Ele não existe.', 404);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado. Ele não existe.', 404);
    }

    return await this.prisma.users
      .update({
        data,
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao atualizar este usuário. Erro: ${e}`,
          502,
        );
      });
  }

  async remove(id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado. Ele não existe.', 404);
    }

    await this.prisma.users
      .delete({
        where: {
          id,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao remover este usuário. Erro: ${e}`,
          502,
        );
      })
      .finally(() => {
        throw new HttpException(`Usuário removido.`, 200);
      });
  }
}

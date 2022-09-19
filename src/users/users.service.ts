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

  async findAll(request) {
    const role = await request.user.role;

    if (!role || role !== 'ADMIN') {
      throw new HttpException(
        'Você não tem autorização para ver todos os usuários.',
        401,
      );
    }

    return await this.prisma.users
      .findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          created_at: true,
          role: true,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Algo deu errado ao resgatar usuários. Erro: ${e}`,
          502,
        );
      });
  }

  async findOne(request, id: string) {
    const userRequester = await request.user;

    if (
      !userRequester ||
      (userRequester.id !== id && userRequester.role !== 'ADMIN')
    ) {
      throw new HttpException(
        'Você não tem autorização para ver este usuário.',
        401,
      );
    }

    const user = await this.prisma.users
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          created_at: true,
          role: true,
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

  // usado apenas para autenticação
  async findByEmail(email: string) {
    const user = await this.prisma.users
      .findUnique({
        where: {
          email,
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

  async update(request, id: string, data: UpdateUserDTO) {
    const userRequester = await request.user;

    if (
      !userRequester ||
      (userRequester.id !== id && userRequester.role !== 'ADMIN')
    ) {
      throw new HttpException(
        'Você não tem autorização para modificar este usuário.',
        401,
      );
    }

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

  async remove(request, id: string) {
    const role = await request.user.role;

    if (!role || role !== 'ADMIN') {
      throw new HttpException(
        'Você não tem autorização para remover usuários.',
        401,
      );
    }

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

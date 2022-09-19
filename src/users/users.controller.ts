import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.usersService.create(data);
  }

  // admin only
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() request) {
    return await this.usersService.findAll(request);
  }

  // admin and self
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() request, @Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOne(request, id);
  }

  // admin and self
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Req() request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateUserDTO,
  ) {
    return await this.usersService.update(request, id, data);
  }

  //admin only
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Req() request, @Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(request, id);
  }
}

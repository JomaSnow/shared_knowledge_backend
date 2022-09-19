import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSayingDTO } from './dto/create_saying.dto';
import { UpdateSayingDTO } from './dto/update_saying.dto';
import { SayingsService } from './sayings.service';

@Controller('sayings')
export class SayingsController {
  constructor(private readonly sayingsService: SayingsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() request, @Body() data: CreateSayingDTO) {
    return this.sayingsService.create(request, data);
  }

  @Get()
  findAll() {
    return this.sayingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sayingsService.findOne(id);
  }

  @Get('user/:id')
  findAllFromAuthor(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sayingsService.findAllFromAuthor(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateSayingDTO,
  ) {
    return this.sayingsService.update(request, id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() request, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.sayingsService.remove(request, id);
  }
}

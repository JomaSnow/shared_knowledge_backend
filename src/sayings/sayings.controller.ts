import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SayingDTO } from './dto/saying.dto';
import { SayingsService } from './sayings.service';

@Controller('sayings')
export class SayingsController {
  constructor(private readonly sayingsService: SayingsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: SayingDTO) {
    return this.sayingsService.create(data);
  }

  @Get()
  findAll() {
    return this.sayingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sayingsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: SayingDTO,
  ) {
    return this.sayingsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sayingsService.remove(id);
  }
}

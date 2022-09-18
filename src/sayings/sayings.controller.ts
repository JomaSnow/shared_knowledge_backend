import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SayingDTO } from './dto/saying.dto';
import { SayingsService } from './sayings.service';

@Controller('sayings')
export class SayingsController {
  constructor(private readonly sayingsService: SayingsService) {}

  @Post()
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
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: SayingDTO,
  ) {
    return this.sayingsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.sayingsService.remove(id);
  }
}

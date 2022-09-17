import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SayingsService } from './sayings.service';
import { CreateSayingDto } from './dto/create-saying.dto';
import { UpdateSayingDto } from './dto/update-saying.dto';

@Controller('sayings')
export class SayingsController {
  constructor(private readonly sayingsService: SayingsService) {}

  @Post()
  create(@Body() createSayingDto: CreateSayingDto) {
    return this.sayingsService.create(createSayingDto);
  }

  @Get()
  findAll() {
    return this.sayingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sayingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSayingDto: UpdateSayingDto) {
    return this.sayingsService.update(+id, updateSayingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sayingsService.remove(+id);
  }
}

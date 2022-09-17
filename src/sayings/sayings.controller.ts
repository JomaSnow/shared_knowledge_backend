import { Body, Controller, Post } from '@nestjs/common';
import { SayingDTO } from './dto/saying.dto';
import { SayingsService } from './sayings.service';

@Controller('sayings')
export class SayingsController {
  constructor(private readonly sayingsService: SayingsService) {}

  @Post()
  async create(@Body() data: SayingDTO) {
    return this.sayingsService.create(data);
  }

  // @Post()
  // create(@Body() createSayingDto: CreateSayingDto) {
  //   return this.sayingsService.create(createSayingDto);
  // }

  // @Get()
  // findAll() {
  //   return this.sayingsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.sayingsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSayingDto: UpdateSayingDto) {
  //   return this.sayingsService.update(+id, updateSayingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.sayingsService.remove(+id);
  // }
}

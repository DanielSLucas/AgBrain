import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { FarmsService } from '../services/farms.service';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { Farm } from '../entities/farm.entity';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  async create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  async findAll(): Promise<Farm[]> {
    return this.farmsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Farm> {
    return this.farmsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDto,
  ): Promise<Farm> {
    return this.farmsService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.farmsService.remove(id);
  }
}

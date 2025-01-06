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

import { CropsService } from '../services/crops.service';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { Crop } from '../entities/crop.entity';

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  async create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  async findAll(): Promise<Crop[]> {
    return this.cropsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCropDto: UpdateCropDto,
  ): Promise<Crop> {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.cropsService.remove(id);
  }
}

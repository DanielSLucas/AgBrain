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

import { HarvestsService } from '../services/harvests.service';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { Harvest } from '../entities/harvest.entity';

@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Post()
  async create(@Body() createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    return this.harvestsService.create(createHarvestDto);
  }

  @Get()
  async findAll(): Promise<Harvest[]> {
    return this.harvestsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Harvest> {
    return this.harvestsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ): Promise<Harvest> {
    return this.harvestsService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.harvestsService.remove(id);
  }
}

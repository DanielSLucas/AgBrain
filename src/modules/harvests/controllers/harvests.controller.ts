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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HarvestsService } from '../services/harvests.service';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { Harvest } from '../entities/harvest.entity';

@ApiTags('Harvests')
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new harvest' })
  @ApiResponse({
    status: 201,
    description: 'Harvest created successfully',
    type: Harvest,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateHarvestDto })
  async create(@Body() createHarvestDto: CreateHarvestDto): Promise<Harvest> {
    return this.harvestsService.create(createHarvestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all harvests' })
  @ApiResponse({
    status: 200,
    description: 'List of harvests',
    type: [Harvest],
  })
  async findAll(): Promise<Harvest[]> {
    return this.harvestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single harvest by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the harvest', type: String })
  @ApiResponse({ status: 200, description: 'Harvest details', type: Harvest })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  async findOne(@Param('id') id: string): Promise<Harvest> {
    return this.harvestsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a harvest by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the harvest', type: String })
  @ApiResponse({
    status: 200,
    description: 'Harvest updated successfully',
    type: Harvest,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  @ApiBody({ type: UpdateHarvestDto })
  async update(
    @Param('id') id: string,
    @Body() updateHarvestDto: UpdateHarvestDto,
  ): Promise<Harvest> {
    return this.harvestsService.update(id, updateHarvestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a harvest by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the harvest', type: String })
  @ApiResponse({ status: 204, description: 'Harvest deleted successfully' })
  @ApiResponse({ status: 404, description: 'Harvest not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.harvestsService.remove(id);
  }
}

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

import { FarmsService } from '../services/farms.service';
import { Farm } from '../entities/farm.entity';
import {
  CreateFarmDto,
  UpdateFarmDto,
  TotalFarmsAreaDto,
  TotalFarmsAreaByTypeDto,
  FarmsCountDto,
  FarmsCountByStateDto,
} from '../dto';

@ApiTags('Farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new farm' })
  @ApiResponse({
    status: 201,
    description: 'Farm created successfully',
    type: Farm,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateFarmDto })
  async create(@Body() createFarmDto: CreateFarmDto): Promise<Farm> {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all farms' })
  @ApiResponse({ status: 200, description: 'List of farms', type: [Farm] })
  async findAll(): Promise<Farm[]> {
    return this.farmsService.findAll();
  }

  @Get('/areas')
  @ApiOperation({ summary: 'Retrieve farms total area' })
  @ApiResponse({
    status: 200,
    description: 'Farms total area',
    type: TotalFarmsAreaDto,
  })
  async totalFarmsArea() {
    return this.farmsService.totalFarmsArea();
  }

  @Get('/areas/by-type')
  @ApiOperation({ summary: 'Retrieve farms total area by type' })
  @ApiResponse({
    status: 200,
    description: 'Farms total area by type',
    type: TotalFarmsAreaByTypeDto,
  })
  async totalFarmsAreasByType() {
    return this.farmsService.totalFarmsAreasByType();
  }

  @Get('/count')
  @ApiOperation({ summary: 'Retrieve total number of farms' })
  @ApiResponse({
    status: 200,
    description: 'Farms count',
    type: FarmsCountDto,
  })
  async totalFarmsCount() {
    return this.farmsService.totalFarmsCount();
  }

  @Get('/count/by-state')
  @ApiOperation({ summary: 'Retrieve total number of farms by state' })
  @ApiResponse({
    status: 200,
    description: 'Farms count by state',
    type: [FarmsCountByStateDto],
  })
  async totalByState() {
    return this.farmsService.totalByState();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single farm by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the farm', type: String })
  @ApiResponse({ status: 200, description: 'Farm details', type: Farm })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  async findOne(@Param('id') id: string): Promise<Farm> {
    return this.farmsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a farm by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the farm', type: String })
  @ApiResponse({
    status: 200,
    description: 'Farm updated successfully',
    type: Farm,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  @ApiBody({ type: UpdateFarmDto })
  async update(
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDto,
  ): Promise<Farm> {
    return this.farmsService.update(id, updateFarmDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a farm by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the farm', type: String })
  @ApiResponse({ status: 204, description: 'Farm deleted successfully' })
  @ApiResponse({ status: 404, description: 'Farm not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.farmsService.remove(id);
  }
}

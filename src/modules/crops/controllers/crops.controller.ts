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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Crops')
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new crop' })
  @ApiResponse({
    status: 201,
    description: 'Crop created successfully',
    type: Crop,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateCropDto })
  async create(@Body() createCropDto: CreateCropDto): Promise<Crop> {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all crops' })
  @ApiResponse({ status: 200, description: 'List of crops', type: [Crop] })
  async findAll(): Promise<Crop[]> {
    return this.cropsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single crop by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the crop', type: String })
  @ApiResponse({ status: 200, description: 'Crop details', type: Crop })
  @ApiResponse({ status: 404, description: 'Crop not found' })
  async findOne(@Param('id') id: string): Promise<Crop> {
    return this.cropsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a crop by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the crop', type: String })
  @ApiResponse({
    status: 200,
    description: 'Crop updated successfully',
    type: Crop,
  })
  @ApiResponse({ status: 404, description: 'Crop not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UpdateCropDto })
  async update(
    @Param('id') id: string,
    @Body() updateCropDto: UpdateCropDto,
  ): Promise<Crop> {
    return this.cropsService.update(id, updateCropDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a crop by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the crop', type: String })
  @ApiResponse({ status: 204, description: 'Crop deleted successfully' })
  @ApiResponse({ status: 404, description: 'Crop not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.cropsService.remove(id);
  }
}

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

import { ProducersService } from '../services/producers.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { Producer } from '../entities/producer.entity';

@ApiTags('Producers')
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new producer' })
  @ApiResponse({
    status: 201,
    description: 'Producer created successfully',
    type: Producer,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  @ApiBody({ type: CreateProducerDto })
  async create(
    @Body() createProducerDto: CreateProducerDto,
  ): Promise<Producer> {
    return this.producersService.create(createProducerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all producers' })
  @ApiResponse({
    status: 200,
    description: 'List of producers',
    type: [Producer],
  })
  async findAll(): Promise<Producer[]> {
    return this.producersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single producer by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the producer', type: String })
  @ApiResponse({ status: 200, description: 'Producer details', type: Producer })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  async findOne(@Param('id') id: string): Promise<Producer> {
    return this.producersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a producer by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the producer', type: String })
  @ApiResponse({
    status: 200,
    description: 'Producer updated successfully',
    type: Producer,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  @ApiBody({ type: UpdateProducerDto })
  async update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ): Promise<Producer> {
    return this.producersService.update(id, updateProducerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a producer by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the producer', type: String })
  @ApiResponse({ status: 204, description: 'Producer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Producer not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.producersService.remove(id);
  }
}

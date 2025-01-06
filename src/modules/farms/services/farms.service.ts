import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaService } from 'src/shared/prisma.service';

import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { Farm } from '../entities/farm.entity';
import { InvalidInput } from 'src/shared/errors/invalid-input';

@Injectable()
export class FarmsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFarmDto) {
    if (data.totalArea < data.arableArea + data.vegetationArea) {
      throw new InvalidInput(
        "'arableArea' + 'vegetationArea' can't be greater than 'totalArea'",
      );
    }

    const farm = await this.prisma.farm.create({
      data,
    });

    return plainToClass(Farm, farm);
  }

  async findAll() {
    const farms = await this.prisma.farm.findMany();

    return farms.map((farm) => plainToClass(Farm, farm));
  }

  async findOne(id: string) {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
    });

    return plainToClass(Farm, farm);
  }

  async update(id: string, data: UpdateFarmDto) {
    const farm = await this.prisma.farm.update({
      where: { id },
      data,
    });

    return plainToClass(Farm, farm);
  }

  async remove(id: string) {
    await this.prisma.farm.delete({
      where: { id },
    });
  }
}

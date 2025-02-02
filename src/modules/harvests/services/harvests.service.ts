import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaService } from 'src/shared/database/prisma.service';

import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { Harvest } from '../entities/harvest.entity';
import { NotFound } from 'src/shared/errors/not-found';

@Injectable()
export class HarvestsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHarvestDto) {
    const harvest = await this.prisma.harvest.create({
      data,
    });

    return plainToClass(Harvest, harvest);
  }

  async findAll() {
    const harvests = await this.prisma.harvest.findMany();

    return harvests.map((harvest) => plainToClass(Harvest, harvest));
  }

  async findOne(id: string) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id },
    });

    if (!harvest) {
      throw new NotFound('Harvest not found');
    }

    return plainToClass(Harvest, harvest);
  }

  async update(id: string, data: UpdateHarvestDto) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id },
    });

    if (!harvest) {
      throw new NotFound('Harvest not found');
    }

    const updatedHarvest = await this.prisma.harvest.update({
      where: { id },
      data,
    });

    return plainToClass(Harvest, updatedHarvest);
  }

  async remove(id: string) {
    const harvest = await this.prisma.harvest.findUnique({
      where: { id },
    });

    if (!harvest) {
      throw new NotFound('Harvest not found');
    }

    await this.prisma.harvest.delete({
      where: { id },
    });
  }
}

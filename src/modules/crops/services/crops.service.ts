import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaService } from 'src/shared/database/prisma.service';

import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { Crop } from '../entities/crop.entity';
import { NotFound } from 'src/shared/errors/not-found';

@Injectable()
export class CropsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCropDto) {
    const crop = await this.prisma.crop.create({
      data,
    });

    return plainToClass(Crop, crop);
  }

  async findAll() {
    const crops = await this.prisma.crop.findMany();

    return crops.map((crop) => plainToClass(Crop, crop));
  }

  async findOne(id: string) {
    const crop = await this.prisma.crop.findUnique({
      where: { id },
    });

    if (!crop) {
      throw new NotFound('Crop not found');
    }

    return plainToClass(Crop, crop);
  }

  async update(id: string, data: UpdateCropDto) {
    const crop = await this.prisma.crop.findUnique({
      where: { id },
    });

    if (!crop) {
      throw new NotFound('Crop not found');
    }

    const updatedCrop = await this.prisma.crop.update({
      where: { id },
      data,
    });

    return plainToClass(Crop, updatedCrop);
  }

  async remove(id: string) {
    const crop = await this.prisma.crop.findUnique({
      where: { id },
    });

    if (!crop) {
      throw new NotFound('Crop not found');
    }

    await this.prisma.crop.delete({
      where: { id },
    });
  }

  async totalByCropName() {
    const countByCropName = await this.prisma.crop.groupBy({
      by: ['name'],
      _count: {
        id: true,
      },
    });

    return countByCropName.map((item) => ({
      crop: item.name,
      count: item._count.id,
    }));
  }
}

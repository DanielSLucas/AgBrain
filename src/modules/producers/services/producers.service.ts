import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { PrismaService } from 'src/prisma.service';

import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { Producer } from '../entities/producer.entity';

@Injectable()
export class ProducersService {
  constructor(private prisma: PrismaService) {}

  async create({ name, document }: CreateProducerDto) {
    const producer = await this.prisma.producer.create({
      data: { name, document },
    });

    return plainToClass(Producer, producer);
  }

  async findAll() {
    const producers = await this.prisma.producer.findMany();

    return producers.map((producer) => plainToClass(Producer, producer));
  }

  async findOne(id: string) {
    const producer = await this.prisma.producer.findUnique({
      where: { id },
    });

    return plainToClass(Producer, producer);
  }

  async update(id: string, { name }: UpdateProducerDto) {
    const producer = await this.prisma.producer.update({
      where: { id },
      data: { name },
    });

    return plainToClass(Producer, producer);
  }

  async remove(id: string) {
    await this.prisma.producer.delete({
      where: { id },
    });
  }
}

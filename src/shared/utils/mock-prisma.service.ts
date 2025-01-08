import { Injectable, OnModuleInit } from '@nestjs/common';

import { MockPrismaEntity } from './mock-prisma-entity';

import { Crop } from 'src/modules/crops/entities/crop.entity';
import { Farm } from 'src/modules/farms/entities/farm.entity';
import { Harvest } from 'src/modules/harvests/entities/harvest.entity';
import { Producer } from 'src/modules/producers/entities/producer.entity';

@Injectable()
export class MockPrismaService implements OnModuleInit {
  crop: MockPrismaEntity<Crop>;
  farm: MockPrismaEntity<Farm>;
  harvest: MockPrismaEntity<Harvest>;
  producer: MockPrismaEntity<Producer>;

  constructor() {
    this.crop = new MockPrismaEntity<Crop>();
    this.farm = new MockPrismaEntity<Farm>();
    this.harvest = new MockPrismaEntity<Harvest>();
    this.producer = new MockPrismaEntity<Producer>();
  }

  onModuleInit() {
    return;
  }
}

import { randomUUID } from 'node:crypto';

import { Harvest } from 'src/modules/harvests/entities/harvest.entity';

export function makeHarvest(override: Partial<Harvest> = {}): Harvest {
  return {
    id: randomUUID(),
    year: new Date().getFullYear(),
    farmId: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

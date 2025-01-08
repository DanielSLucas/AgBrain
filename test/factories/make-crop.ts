import { randomUUID } from 'node:crypto';

import { Crop } from 'src/modules/crops/entities/crop.entity';

export function makeCrop(override: Partial<Crop> = {}): Crop {
  return {
    id: randomUUID(),
    name: 'Sample Crop',
    harvestId: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

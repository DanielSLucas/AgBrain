import { randomUUID } from 'node:crypto';

import { Farm } from 'src/modules/farms/entities/farm.entity';

export function makeFarm(override: Partial<Farm> = {}): Farm {
  return {
    id: randomUUID(),
    name: 'Sample Farm',
    city: 'Sample City',
    state: 'Sample State',
    totalArea: 100,
    arableArea: 70,
    vegetationArea: 30,
    producerId: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

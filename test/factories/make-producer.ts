import { randomUUID } from 'crypto';
import { Producer } from 'src/modules/producers/entities/producer.entity';

export function makeProducer(override: Partial<Producer> = {}): Producer {
  return {
    id: randomUUID(),
    name: 'John Doe',
    document: '12345678910',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };
}

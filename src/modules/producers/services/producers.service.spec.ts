import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { ProducersService } from '../services/producers.service';
import { PrismaService } from 'src/shared/prisma.service';
import { Producer } from '../entities/producer.entity';

describe('ProducersService', () => {
  let service: ProducersService;
  let prisma: PrismaService;

  const mockPrismaService = {
    producer: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new producer', async () => {
      const dto = {
        name: 'John Doe',
        document: '12345678910',
      };
      const createdProducer = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.producer, 'create').mockResolvedValue(createdProducer);

      const result = await service.create(dto);
      expect(result).toEqual(plainToClass(Producer, createdProducer));
      expect(prisma.producer.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all producers', async () => {
      const producers = [
        {
          id: '1',
          name: 'John Doe',
          document: '12345678910',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Jane Doe',
          document: '98765432101',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.producer, 'findMany').mockResolvedValue(producers);

      const result = await service.findAll();
      expect(result).toEqual(
        producers.map((producer) => plainToClass(Producer, producer)),
      );
      expect(prisma.producer.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a producer by id', async () => {
      const id = '1';
      const producer = {
        id,
        name: 'John Doe',
        document: '12345678910',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.producer, 'findUnique').mockResolvedValue(producer);

      const result = await service.findOne(id);
      expect(result).toEqual(plainToClass(Producer, producer));
      expect(prisma.producer.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return null if no producer is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.producer, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
      expect(prisma.producer.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const id = '1';
      const updateDto = { name: 'Updated Name' };
      const updatedProducer = {
        id,
        name: updateDto.name,
        document: '12345678910',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.producer, 'update').mockResolvedValue(updatedProducer);

      const result = await service.update(id, updateDto);
      expect(result).toEqual(plainToClass(Producer, updatedProducer));
      expect(prisma.producer.update).toHaveBeenCalledWith({
        where: { id },
        data: { name: updateDto.name },
      });
    });
  });

  describe('remove', () => {
    it('should delete a producer by id', async () => {
      const id = '1';

      jest.spyOn(prisma.producer, 'delete').mockResolvedValue(undefined);

      await service.remove(id);
      expect(prisma.producer.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { HarvestsService } from './harvests.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Harvest } from '../entities/harvest.entity';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { NotFound } from 'src/shared/errors/not-found';

describe('HarvestsService', () => {
  let service: HarvestsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    harvest: {
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
        HarvestsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<HarvestsService>(HarvestsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new harvest', async () => {
      const dto: CreateHarvestDto = {
        year: 2020,
        farmId: 'farmId',
      };
      const createdHarvest = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.harvest, 'create').mockResolvedValue(createdHarvest);

      const result = await service.create(dto);
      expect(result).toEqual(plainToClass(Harvest, createdHarvest));
      expect(prisma.harvest.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all harvests', async () => {
      const harvests = [
        {
          id: '1',
          year: 2020,
          farmId: 'farmId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          year: 2020,
          farmId: 'farmId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.harvest, 'findMany').mockResolvedValue(harvests);

      const result = await service.findAll();
      expect(result).toEqual(
        harvests.map((harvest) => plainToClass(Harvest, harvest)),
      );
      expect(prisma.harvest.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a harvest by id', async () => {
      const id = '1';
      const harvest = {
        id,
        year: 2020,
        farmId: 'farmId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.harvest, 'findUnique').mockResolvedValue(harvest);

      const result = await service.findOne(id);
      expect(result).toEqual(plainToClass(Harvest, harvest));
      expect(prisma.harvest.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw NotFound error if no harvest is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.harvest, 'findUnique').mockResolvedValue(null);

      await expect(() => service.findOne(id)).rejects.toBeInstanceOf(NotFound);
      expect(prisma.harvest.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a harvest', async () => {
      const id = '1';
      const updateDto = { year: 2021 };
      const updatedHarvest = {
        id,
        year: 2021,
        farmId: 'farmId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest
        .spyOn(prisma.harvest, 'findUnique')
        .mockResolvedValue({ ...updatedHarvest, year: 2020 });
      jest.spyOn(prisma.harvest, 'update').mockResolvedValue(updatedHarvest);

      const result = await service.update(id, updateDto);
      expect(result).toEqual(plainToClass(Harvest, updatedHarvest));
      expect(prisma.harvest.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });

    it('should throw NotFound error if no harvest is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.harvest, 'findUnique').mockResolvedValue(null);

      await expect(() => service.update(id, {})).rejects.toBeInstanceOf(
        NotFound,
      );
      expect(prisma.harvest.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('remove', () => {
    it('should delete a harvest by id', async () => {
      const id = '1';

      jest.spyOn(prisma.harvest, 'findUnique').mockResolvedValue({} as Harvest);
      jest.spyOn(prisma.harvest, 'delete').mockResolvedValue(undefined);

      await service.remove(id);
      expect(prisma.harvest.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should throw NotFound error if no harvest is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.harvest, 'findUnique').mockResolvedValue(null);

      await expect(() => service.remove(id)).rejects.toBeInstanceOf(NotFound);
      expect(prisma.harvest.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});

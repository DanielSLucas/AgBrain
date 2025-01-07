import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/shared/prisma.service';
import { FarmsService } from './farms.service';
import { CreateFarmDto, UpdateFarmDto } from '../dto';
import { Farm } from '../entities/farm.entity';
import { InvalidInput } from 'src/shared/errors/invalid-input';
import { NotFound } from 'src/shared/errors/not-found';

describe('FarmsService', () => {
  let service: FarmsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    farm: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      aggregate: jest.fn(),
      groupBy: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<FarmsService>(FarmsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a farm', async () => {
      const createFarmDto: CreateFarmDto = {
        name: 'Farm 1',
        city: 'City A',
        state: 'State A',
        totalArea: 100,
        arableArea: 70,
        vegetationArea: 30,
        producerId: 'producerId',
      };

      const createdFarm: Farm = {
        id: '1',
        ...createFarmDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.farm, 'create').mockResolvedValue(createdFarm);

      const result = await service.create(createFarmDto);
      expect(result).toEqual(createdFarm);
      expect(prisma.farm.create).toHaveBeenCalledWith({ data: createFarmDto });
    });

    it('should not create a farm with greater (arableArea + vegetationArea) than totalArea', async () => {
      const createFarmDto: CreateFarmDto = {
        name: 'Farm 1',
        city: 'City A',
        state: 'State A',
        totalArea: 50,
        arableArea: 70,
        vegetationArea: 30,
        producerId: 'producerId',
      };

      await expect(() => service.create(createFarmDto)).rejects.toBeInstanceOf(
        InvalidInput,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of farms', async () => {
      const farms: Farm[] = [
        {
          id: '1',
          name: 'Farm 1',
          city: 'City A',
          state: 'State A',
          totalArea: 100,
          arableArea: 70,
          vegetationArea: 30,
          producerId: 'producerId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Farm 2',
          city: 'City B',
          state: 'State B',
          totalArea: 200,
          arableArea: 150,
          vegetationArea: 50,
          producerId: 'producerId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.farm, 'findMany').mockResolvedValue(farms);

      const result = await service.findAll();
      expect(result).toEqual(farms);
      expect(prisma.farm.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a farm by id', async () => {
      const id = '1';
      const farm: Farm = {
        id,
        name: 'Farm 1',
        city: 'City A',
        state: 'State A',
        totalArea: 100,
        arableArea: 70,
        vegetationArea: 30,
        producerId: 'producerId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.farm, 'findUnique').mockResolvedValue(farm);

      const result = await service.findOne(id);
      expect(result).toEqual(farm);
      expect(prisma.farm.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFound error if no farm is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.farm, 'findUnique').mockResolvedValue(null);

      await expect(() => service.findOne(id)).rejects.toBeInstanceOf(NotFound);
      expect(prisma.farm.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a farm', async () => {
      const id = '1';
      const updateFarmDto: UpdateFarmDto = {
        name: 'Updated Farm Name',
        totalArea: 120,
      };

      const updatedFarm: Farm = {
        id,
        name: updateFarmDto.name,
        city: 'City A',
        state: 'State A',
        totalArea: updateFarmDto.totalArea,
        arableArea: 70,
        vegetationArea: 30,
        producerId: 'producerId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.farm, 'findUnique').mockResolvedValue({
        ...updatedFarm,
        name: 'Farm name',
        totalArea: 100,
      });
      jest.spyOn(prisma.farm, 'update').mockResolvedValue(updatedFarm);

      const result = await service.update(id, updateFarmDto);
      expect(result).toEqual(updatedFarm);
      expect(prisma.farm.update).toHaveBeenCalledWith({
        where: { id },
        data: updateFarmDto,
      });
    });

    it('should throw NotFound error if no farm is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.farm, 'findUnique').mockResolvedValue(null);

      await expect(() => service.update(id, {})).rejects.toBeInstanceOf(
        NotFound,
      );
      expect(prisma.farm.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('remove', () => {
    it('should delete a farm by id', async () => {
      const id = '1';

      jest.spyOn(prisma.farm, 'findUnique').mockResolvedValue({} as Farm);
      jest.spyOn(prisma.farm, 'delete').mockResolvedValue(undefined);

      await service.remove(id);
      expect(prisma.farm.delete).toHaveBeenCalledWith({ where: { id } });
    });

    it('should throw NotFound error if no farm is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.farm, 'findUnique').mockResolvedValue(null);

      await expect(() => service.remove(id)).rejects.toBeInstanceOf(NotFound);
      expect(prisma.farm.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('totalFarmsCount', () => {
    it('should return the total count of farms', async () => {
      const mockCount = 5;

      jest.spyOn(prisma.farm, 'count').mockResolvedValue(mockCount);

      const result = await service.totalFarmsCount();
      expect(result).toEqual({ count: mockCount });
      expect(prisma.farm.count).toHaveBeenCalled();
    });
  });

  describe('totalFarmsArea', () => {
    it('should return the total area of all farms', async () => {
      const mockTotalArea = 500;

      jest.spyOn(prisma.farm, 'aggregate').mockResolvedValue({
        _sum: { totalArea: mockTotalArea },
      } as any);

      const result = await service.totalFarmsArea();
      expect(result).toEqual({ totalArea: mockTotalArea });
      expect(prisma.farm.aggregate).toHaveBeenCalledWith({
        _sum: { totalArea: true },
      });
    });
  });

  describe('totalByState', () => {
    it('should return the count of farms grouped by state', async () => {
      const mockGroupByState = [
        { state: 'State A', _count: { id: 3 } },
        { state: 'State B', _count: { id: 2 } },
      ];

      jest
        .spyOn(prisma.farm as any, 'groupBy')
        .mockResolvedValue(mockGroupByState);

      const result = await service.totalByState();
      expect(result).toEqual([
        { state: 'State A', count: 3 },
        { state: 'State B', count: 2 },
      ]);
      expect(prisma.farm.groupBy).toHaveBeenCalledWith({
        by: ['state'],
        _count: { id: true },
      });
    });
  });

  describe('totalFarmsAreasByType', () => {
    it('should return the total arable and vegetation areas', async () => {
      const mockAggregateResult = {
        _sum: {
          arableArea: 300,
          vegetationArea: 200,
        },
      };

      jest
        .spyOn(prisma.farm, 'aggregate')
        .mockResolvedValue(mockAggregateResult as any);

      const result = await service.totalFarmsAreasByType();
      expect(result).toEqual({
        arableArea: 300,
        vegetationArea: 200,
      });
      expect(prisma.farm.aggregate).toHaveBeenCalledWith({
        _sum: { arableArea: true, vegetationArea: true },
      });
    });
  });
});

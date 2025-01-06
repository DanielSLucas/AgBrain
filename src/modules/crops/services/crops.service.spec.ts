import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';

import { CropsService } from './crops.service';
import { PrismaService } from 'src/shared/prisma.service';
import { Crop } from '../entities/crop.entity';
import { CreateCropDto } from '../dto/create-crop.dto';

describe('CropsService', () => {
  let service: CropsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    crop: {
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
        CropsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CropsService>(CropsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new crop', async () => {
      const dto: CreateCropDto = {
        name: 'milho',
        harvestId: 'harvestId',
      };
      const createdCrop = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.crop, 'create').mockResolvedValue(createdCrop);

      const result = await service.create(dto);
      expect(result).toEqual(plainToClass(Crop, createdCrop));
      expect(prisma.crop.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all crops', async () => {
      const crops = [
        {
          id: '1',
          name: 'milho',
          harvestId: 'harvestId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'milho',
          harvestId: 'harvestId',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prisma.crop, 'findMany').mockResolvedValue(crops);

      const result = await service.findAll();
      expect(result).toEqual(crops.map((crop) => plainToClass(Crop, crop)));
      expect(prisma.crop.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a crop by id', async () => {
      const id = '1';
      const crop = {
        id,
        name: 'milho',
        harvestId: 'harvestId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.crop, 'findUnique').mockResolvedValue(crop);

      const result = await service.findOne(id);
      expect(result).toEqual(plainToClass(Crop, crop));
      expect(prisma.crop.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    it('should return null if no crop is found', async () => {
      const id = 'non-existent-id';

      jest.spyOn(prisma.crop, 'findUnique').mockResolvedValue(null);

      const result = await service.findOne(id);
      expect(result).toBeNull();
      expect(prisma.crop.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a crop', async () => {
      const id = '1';
      const updateDto = { name: 'soja' };
      const updatedCrop = {
        id,
        name: 'milho',
        harvestId: 'harvestId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prisma.crop, 'update').mockResolvedValue(updatedCrop);

      const result = await service.update(id, updateDto);
      expect(result).toEqual(plainToClass(Crop, updatedCrop));
      expect(prisma.crop.update).toHaveBeenCalledWith({
        where: { id },
        data: updateDto,
      });
    });
  });

  describe('remove', () => {
    it('should delete a crop by id', async () => {
      const id = '1';

      jest.spyOn(prisma.crop, 'delete').mockResolvedValue(undefined);

      await service.remove(id);
      expect(prisma.crop.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});

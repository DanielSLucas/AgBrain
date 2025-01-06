import { Test, TestingModule } from '@nestjs/testing';

import { CropsController } from './crops.controller';
import { CropsService } from '../services/crops.service';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { CreateCropDto } from '../dto/create-crop.dto';
import { Crop } from '../entities/crop.entity';

describe('CropsController', () => {
  let controller: CropsController;
  let service: CropsService;

  const mockCropsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropsController],
      providers: [{ provide: CropsService, useValue: mockCropsService }],
    }).compile();

    controller = module.get<CropsController>(CropsController);
    service = module.get<CropsService>(CropsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a crop', async () => {
      const dto: CreateCropDto = {
        name: 'milho',
        harvestId: 'harvestId',
      };
      const createdCrop: Crop = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdCrop);

      const result = await controller.create(dto);
      expect(result).toEqual(createdCrop);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of crops', async () => {
      const crops: Crop[] = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(crops);

      const result = await controller.findAll();
      expect(result).toEqual(crops);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a crop by id', async () => {
      const id = '1';
      const crop: Crop = {
        id,
        name: 'milho',
        harvestId: 'harvestId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(crop);

      const result = await controller.findOne(id);
      expect(result).toEqual(crop);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a crop', async () => {
      const id = '1';
      const dto: UpdateCropDto = { name: 'soja' };
      const updatedCrop: Crop = {
        id,
        name: 'milho',
        harvestId: 'harvestId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedCrop);

      const result = await controller.update(id, dto);
      expect(result).toEqual(updatedCrop);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a crop by id', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should return no content status code (204)', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(id);
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});

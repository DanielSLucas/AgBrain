import { Test, TestingModule } from '@nestjs/testing';

import { HarvestsController } from './harvests.controller';
import { HarvestsService } from '../services/harvests.service';
import { UpdateHarvestDto } from '../dto/update-harvest.dto';
import { CreateHarvestDto } from '../dto/create-harvest.dto';
import { Harvest } from '../entities/harvest.entity';

describe('HarvestsController', () => {
  let controller: HarvestsController;
  let service: HarvestsService;

  const mockHarvestsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestsController],
      providers: [{ provide: HarvestsService, useValue: mockHarvestsService }],
    }).compile();

    controller = module.get<HarvestsController>(HarvestsController);
    service = module.get<HarvestsService>(HarvestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a harvest', async () => {
      const dto: CreateHarvestDto = {
        year: 2020,
        farmId: 'farmId',
      };
      const createdHarvest: Harvest = {
        id: '1',
        ...dto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdHarvest);

      const result = await controller.create(dto);
      expect(result).toEqual(createdHarvest);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of harvests', async () => {
      const harvests: Harvest[] = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(harvests);

      const result = await controller.findAll();
      expect(result).toEqual(harvests);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a harvest by id', async () => {
      const id = '1';
      const harvest: Harvest = {
        id,
        year: 2020,
        farmId: 'farmId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(harvest);

      const result = await controller.findOne(id);
      expect(result).toEqual(harvest);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a harvest', async () => {
      const id = '1';
      const dto: UpdateHarvestDto = { year: 2021 };
      const updatedHarvest: Harvest = {
        id,
        year: 2020,
        farmId: 'farmId',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedHarvest);

      const result = await controller.update(id, dto);
      expect(result).toEqual(updatedHarvest);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a harvest by id', async () => {
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

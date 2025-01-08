import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto, UpdateFarmDto } from '../dto';
import { Farm } from '../entities/farm.entity';
import { makeFarm } from 'src/shared/utils/factories';

describe('FarmsController', () => {
  let controller: FarmsController;
  let service: FarmsService;

  const mockFarmsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    totalFarmsCount: jest.fn(),
    totalFarmsArea: jest.fn(),
    totalByState: jest.fn(),
    totalFarmsAreasByType: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmsController],
      providers: [{ provide: FarmsService, useValue: mockFarmsService }],
    }).compile();

    controller = module.get<FarmsController>(FarmsController);
    service = module.get<FarmsService>(FarmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const createdFarm = makeFarm(createFarmDto);

      jest.spyOn(service, 'create').mockResolvedValue(createdFarm);

      const result = await controller.create(createFarmDto);
      expect(result).toEqual(createdFarm);
      expect(service.create).toHaveBeenCalledWith(createFarmDto);
    });
  });

  describe('findAll', () => {
    it('should return all farms', async () => {
      const farms: Farm[] = [makeFarm(), makeFarm()];

      jest.spyOn(service, 'findAll').mockResolvedValue(farms);

      const result = await controller.findAll();
      expect(result).toEqual(farms);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a farm by id', async () => {
      const id = '1';
      const farm = makeFarm({ id });

      jest.spyOn(service, 'findOne').mockResolvedValue(farm);

      const result = await controller.findOne(id);
      expect(result).toEqual(farm);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a farm', async () => {
      const id = '1';
      const updateFarmDto: UpdateFarmDto = {
        name: 'Updated Farm',
        totalArea: 120,
      };

      const updatedFarm = makeFarm({ id, ...updateFarmDto });

      jest.spyOn(service, 'update').mockResolvedValue(updatedFarm);

      const result = await controller.update(id, updateFarmDto);
      expect(result).toEqual(updatedFarm);
      expect(service.update).toHaveBeenCalledWith(id, updateFarmDto);
    });
  });

  describe('remove', () => {
    it('should remove a farm by id', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });

    it('should return no content on delete', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(id);
      expect(result).toBeUndefined();
    });
  });

  describe('totalFarmsArea', () => {
    it('should return the total farms area', async () => {
      const totalArea = { totalArea: 1000 };
      jest.spyOn(service, 'totalFarmsArea').mockResolvedValue(totalArea);

      const result = await controller.totalFarmsArea();
      expect(result).toEqual(totalArea);
      expect(service.totalFarmsArea).toHaveBeenCalled();
    });
  });

  describe('totalFarmsAreasByType', () => {
    it('should return the total farms area by type', async () => {
      const areasByType = {
        arableArea: 700,
        vegetationArea: 300,
      };
      jest
        .spyOn(service, 'totalFarmsAreasByType')
        .mockResolvedValue(areasByType);

      const result = await controller.totalFarmsAreasByType();
      expect(result).toEqual(areasByType);
      expect(service.totalFarmsAreasByType).toHaveBeenCalled();
    });
  });

  describe('totalFarmsCount', () => {
    it('should return the total number of farms', async () => {
      const farmCount = { count: 15 };
      jest.spyOn(service, 'totalFarmsCount').mockResolvedValue(farmCount);

      const result = await controller.totalFarmsCount();
      expect(result).toEqual(farmCount);
      expect(service.totalFarmsCount).toHaveBeenCalled();
    });
  });

  describe('totalByState', () => {
    it('should return the total number of farms by state', async () => {
      const farmsByState = [
        { state: 'State A', count: 10 },
        { state: 'State B', count: 5 },
      ];
      jest.spyOn(service, 'totalByState').mockResolvedValue(farmsByState);

      const result = await controller.totalByState();
      expect(result).toEqual(farmsByState);
      expect(service.totalByState).toHaveBeenCalled();
    });
  });
});

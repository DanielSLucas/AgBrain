import { Test, TestingModule } from '@nestjs/testing';
import { FarmsController } from './farms.controller';
import { FarmsService } from '../services/farms.service';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { Farm } from '../entities/farm.entity';

describe('FarmsController', () => {
  let controller: FarmsController;
  let service: FarmsService;

  const mockFarmsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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

      const createdFarm: Farm = {
        id: '1',
        ...createFarmDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdFarm);

      const result = await controller.create(createFarmDto);
      expect(result).toEqual(createdFarm);
      expect(service.create).toHaveBeenCalledWith(createFarmDto);
    });
  });

  describe('findAll', () => {
    it('should return all farms', async () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(farms);

      const result = await controller.findAll();
      expect(result).toEqual(farms);
      expect(service.findAll).toHaveBeenCalled();
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
      expect(result).toBeUndefined(); // The method returns void
    });
  });
});

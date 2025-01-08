import { Test, TestingModule } from '@nestjs/testing';

import { ProducersController } from './producers.controller';
import { ProducersService } from '../services/producers.service';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { Producer } from '../entities/producer.entity';
import { makeProducer } from 'src/shared/utils/factories';

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: ProducersService;

  const mockProducersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        { provide: ProducersService, useValue: mockProducersService },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a producer', async () => {
      const dto: CreateProducerDto = {
        name: 'John Doe',
        document: '123456789',
      };
      const createdProducer = makeProducer(dto);

      jest.spyOn(service, 'create').mockResolvedValue(createdProducer);

      const result = await controller.create(dto);
      expect(result).toEqual(createdProducer);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const producers: Producer[] = [
        makeProducer({ name: 'John Doe', document: '123456789' }),
        makeProducer({ name: 'Jane Doe', document: '987654321' }),
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(producers);

      const result = await controller.findAll();
      expect(result).toEqual(producers);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a producer by id', async () => {
      const id = '1';
      const producer: Producer = makeProducer({
        id,
        name: 'John Doe',
        document: '123456789',
      });

      jest.spyOn(service, 'findOne').mockResolvedValue(producer);

      const result = await controller.findOne(id);
      expect(result).toEqual(producer);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a producer', async () => {
      const id = '1';
      const dto: UpdateProducerDto = { name: 'Updated Name' };
      const updatedProducer: Producer = makeProducer({
        id,
        name: dto.name,
        document: '123456789',
      });

      jest.spyOn(service, 'update').mockResolvedValue(updatedProducer);

      const result = await controller.update(id, dto);
      expect(result).toEqual(updatedProducer);
      expect(service.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a producer by id', async () => {
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

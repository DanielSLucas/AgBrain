import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { MockPrismaService } from 'src/shared/utils/mock-prisma.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { makeCrop, makeFarm } from 'src/shared/utils/factories';

describe('End to end testing', () => {
  let app: INestApplication;
  let mockPrismaService: MockPrismaService;

  beforeEach(async () => {
    mockPrismaService = new MockPrismaService();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('should be able to create, update, and delete a producer', async () => {
    const createProducerDto = {
      name: 'John Doe',
      document: '12345678910',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(201);

    const createdProducer = createResponse.body;
    expect(createdProducer).toEqual(
      expect.objectContaining({
        ...createProducerDto,
      }),
    );

    const updateProducerDto = {
      name: 'Jane Doe',
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/producers/${createdProducer.id}`)
      .send(updateProducerDto)
      .expect(200);

    const updatedProducer = updateResponse.body;
    expect(updatedProducer).toEqual(
      expect.objectContaining({
        ...updateProducerDto,
        document: createProducerDto.document,
      }),
    );

    await request(app.getHttpServer())
      .delete(`/producers/${createdProducer.id}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/producers/${createdProducer.id}`)
      .expect(404);
  });

  it('should not be able to create a producer with a invalid document', async () => {
    const createProducerDto = {
      name: 'John Doe',
      document: 'invalid-document',
    };

    await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(400);
  });

  it('should not be able to create a farm with greater (arableArea + vegetationArea) than totalArea', async () => {
    const createProducerDto = {
      name: 'John Doe',
      document: '12345678910',
    };

    const { body: producer } = await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(201);

    const createFarmDto = {
      name: 'Farm 1',
      city: 'City A',
      state: 'State A',
      totalArea: 50,
      arableArea: 70,
      vegetationArea: 30,
      producerId: producer.id,
    };

    await request(app.getHttpServer())
      .post('/farms')
      .send(createFarmDto)
      .expect(400);
  });

  it('should be able to create multiple crops by harvest', async () => {
    const createProducerDto = {
      name: 'John Doe',
      document: '12345678910',
    };

    const { body: producer } = await request(app.getHttpServer())
      .post('/producers')
      .send(createProducerDto)
      .expect(201);

    const createFarmDto = {
      name: 'Farm 1',
      city: 'City A',
      state: 'State A',
      totalArea: 100,
      arableArea: 70,
      vegetationArea: 30,
      producerId: producer.id,
    };

    const { body: farm } = await request(app.getHttpServer())
      .post('/farms')
      .send(createFarmDto)
      .expect(201);

    const createHarvestDto = {
      year: 2020,
      farmId: farm.id,
    };

    const { body: harvest } = await request(app.getHttpServer())
      .post('/harvests')
      .send(createHarvestDto)
      .expect(201);

    await request(app.getHttpServer())
      .post('/crops')
      .send({
        name: 'milho',
        harvestId: harvest.id,
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/crops')
      .send({
        name: 'soja',
        harvestId: harvest.id,
      })
      .expect(201);
  });

  describe('dashboard routes', () => {
    it('should be able to get the total number of farms registered', async () => {
      mockPrismaService.farm.db = [
        makeFarm(),
        makeFarm(),
        makeFarm(),
        makeFarm(),
      ];

      const { body: response } = await request(app.getHttpServer())
        .get('/farms/count')
        .expect(200);

      expect(response.count).toEqual(4);
    });

    it('should be able to get the total area of all farms', async () => {
      mockPrismaService.farm.db = [
        makeFarm({ totalArea: 100 }),
        makeFarm({ totalArea: 100 }),
        makeFarm({ totalArea: 100 }),
        makeFarm({ totalArea: 100 }),
        makeFarm({ totalArea: 100 }),
      ];

      const { body: response } = await request(app.getHttpServer())
        .get('/farms/areas')
        .expect(200);

      expect(response.totalArea).toEqual(500);
    });

    it('should be able to get the area by type of all farms', async () => {
      mockPrismaService.farm.db = [
        makeFarm({ arableArea: 70, vegetationArea: 30 }),
        makeFarm({ arableArea: 70, vegetationArea: 30 }),
        makeFarm({ arableArea: 70, vegetationArea: 30 }),
        makeFarm({ arableArea: 70, vegetationArea: 30 }),
        makeFarm({ arableArea: 70, vegetationArea: 30 }),
      ];

      const { body: response } = await request(app.getHttpServer())
        .get('/farms/areas/by-type')
        .expect(200);

      expect(response.arableArea).toEqual(350);
      expect(response.vegetationArea).toEqual(150);
    });

    it('should be able to get the total farms by state', async () => {
      mockPrismaService.farm.db = [
        makeFarm({ state: 'SP' }),
        makeFarm({ state: 'MG' }),
        makeFarm({ state: 'MG' }),
        makeFarm({ state: 'MG' }),
        makeFarm({ state: 'RJ' }),
      ];

      const { body: response } = await request(app.getHttpServer())
        .get('/farms/count/by-state')
        .expect(200);

      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            state: 'SP',
            count: 1,
          }),
          expect.objectContaining({
            state: 'MG',
            count: 3,
          }),
          expect.objectContaining({
            state: 'RJ',
            count: 1,
          }),
        ]),
      );
    });

    it('should be able to get the total crops by name', async () => {
      mockPrismaService.crop.db = [
        makeCrop({ name: 'Milho' }),
        makeCrop({ name: 'Soja' }),
        makeCrop({ name: 'Arroz' }),
        makeCrop({ name: 'Milho' }),
      ];

      const { body: response } = await request(app.getHttpServer())
        .get('/crops/count/by-name')
        .expect(200);

      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            crop: 'Milho',
            count: 2,
          }),
          expect.objectContaining({
            crop: 'Soja',
            count: 1,
          }),
          expect.objectContaining({
            crop: 'Arroz',
            count: 1,
          }),
        ]),
      );
    });
  });
});

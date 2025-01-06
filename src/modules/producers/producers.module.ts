import { Module } from '@nestjs/common';

import { ProducersService } from './services/producers.service';
import { ProducersController } from './controllers/producers.controller';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
  controllers: [ProducersController],
  providers: [ProducersService, PrismaService],
})
export class ProducersModule {}

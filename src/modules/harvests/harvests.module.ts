import { Module } from '@nestjs/common';

import { HarvestsService } from './services/harvests.service';
import { HarvestsController } from './controllers/harvests.controller';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
  controllers: [HarvestsController],
  providers: [HarvestsService, PrismaService],
})
export class HarvestsModule {}

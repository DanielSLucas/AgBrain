import { Module } from '@nestjs/common';

import { CropsService } from './services/crops.service';
import { CropsController } from './controllers/crops.controller';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
  controllers: [CropsController],
  providers: [CropsService, PrismaService],
})
export class CropsModule {}

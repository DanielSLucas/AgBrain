import { Module } from '@nestjs/common';

import { FarmsService } from './services/farms.service';
import { FarmsController } from './controllers/farms.controller';
import { PrismaService } from 'src/shared/prisma.service';

@Module({
  controllers: [FarmsController],
  providers: [FarmsService, PrismaService],
})
export class FarmsModule {}

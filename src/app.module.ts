import { Module } from '@nestjs/common';

import {
  CropsModule,
  FarmsModule,
  HarvestsModule,
  ProducersModule,
} from './modules';

@Module({
  imports: [ProducersModule, FarmsModule, HarvestsModule, CropsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

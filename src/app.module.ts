import { Module } from '@nestjs/common';

import { ProducersModule } from './modules/producers/producers.module';
import { FarmsModule } from './modules/farms/farms.module';
import { HarvestsModule } from './modules/harvests/harvests.module';

@Module({
  imports: [ProducersModule, FarmsModule, HarvestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

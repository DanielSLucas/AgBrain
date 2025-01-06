import { Module } from '@nestjs/common';

import { ProducersModule } from './modules/producers/producers.module';
import { FarmsModule } from './modules/farms/farms.module';

@Module({
  imports: [ProducersModule, FarmsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

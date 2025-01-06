import { Module } from '@nestjs/common';

import { ProducersModule } from './modules/producers/producers.module';

@Module({
  imports: [ProducersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

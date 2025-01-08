import { Module } from '@nestjs/common';

import { ProducersService } from './services/producers.service';
import { ProducersController } from './controllers/producers.controller';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}

import { Module } from '@nestjs/common';

import { HarvestsService } from './services/harvests.service';
import { HarvestsController } from './controllers/harvests.controller';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HarvestsController],
  providers: [HarvestsService],
})
export class HarvestsModule {}

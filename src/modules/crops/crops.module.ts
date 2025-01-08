import { Module } from '@nestjs/common';

import { CropsService } from './services/crops.service';
import { CropsController } from './controllers/crops.controller';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CropsController],
  providers: [CropsService],
})
export class CropsModule {}

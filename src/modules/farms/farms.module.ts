import { Module } from '@nestjs/common';

import { FarmsService } from './services/farms.service';
import { FarmsController } from './controllers/farms.controller';
import { DatabaseModule } from 'src/shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}

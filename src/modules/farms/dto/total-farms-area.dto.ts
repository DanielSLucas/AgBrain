import { ApiProperty } from '@nestjs/swagger';

export class TotalFarmsAreaDto {
  @ApiProperty()
  totalArea: number;
}

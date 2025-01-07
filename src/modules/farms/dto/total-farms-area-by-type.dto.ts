import { ApiProperty } from '@nestjs/swagger';

export class TotalFarmsAreaByTypeDto {
  @ApiProperty()
  arableArea: number;

  @ApiProperty()
  vegetationArea: number;
}

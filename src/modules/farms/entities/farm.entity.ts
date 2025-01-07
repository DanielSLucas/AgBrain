import { ApiProperty } from '@nestjs/swagger';

export class Farm {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  totalArea: number;

  @ApiProperty()
  arableArea: number;

  @ApiProperty()
  vegetationArea: number;

  @ApiProperty()
  producerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

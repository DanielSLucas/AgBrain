import { ApiProperty } from '@nestjs/swagger';

export class Harvest {
  @ApiProperty()
  id: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  farmId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

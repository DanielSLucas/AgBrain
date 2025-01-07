import { ApiProperty } from '@nestjs/swagger';

export class FarmsCountByStateDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  state: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class FarmsCountDto {
  @ApiProperty()
  count: number;
}

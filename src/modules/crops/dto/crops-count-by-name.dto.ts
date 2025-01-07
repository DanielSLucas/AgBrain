import { ApiProperty } from '@nestjs/swagger';

export class CropsCountByNameDto {
  @ApiProperty()
  count: number;

  @ApiProperty()
  crop: string;
}

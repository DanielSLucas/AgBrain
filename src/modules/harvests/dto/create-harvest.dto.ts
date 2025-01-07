import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  farmId: string;
}

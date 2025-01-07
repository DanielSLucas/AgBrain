import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  totalArea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  arableArea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  vegetationArea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  producerId: string;
}

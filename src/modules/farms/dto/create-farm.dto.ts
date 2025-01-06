import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsPositive()
  totalArea: number;

  @IsNotEmpty()
  @IsPositive()
  arableArea: number;

  @IsNotEmpty()
  @IsPositive()
  vegetationArea: number;

  @IsNotEmpty()
  @IsString()
  producerId: string;
}

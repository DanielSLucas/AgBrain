import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateHarvestDto {
  @IsNotEmpty()
  @IsPositive()
  year: number;

  @IsNotEmpty()
  @IsString()
  farmId: string;
}

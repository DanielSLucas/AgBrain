import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProducerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform((params) => params.value.replace(/\D/g, ''))
  @Matches(/(^\d{11}$)|(^\d{14}$)/)
  document: string;
}

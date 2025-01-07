import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProducerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((params) => params.value.replace(/\D/g, ''))
  @Matches(/(^\d{11}$)|(^\d{14}$)/, {
    message: "'document' must be a cpf or a cpnj",
  })
  document: string;
}

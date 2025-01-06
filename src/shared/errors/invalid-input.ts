import { BadRequestException } from '@nestjs/common';

export class InvalidInput extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

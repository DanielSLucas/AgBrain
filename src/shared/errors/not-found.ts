import { NotFoundException } from '@nestjs/common';

export class NotFound extends NotFoundException {
  constructor(message: string) {
    super(message);
  }
}

import { ConflictException } from '@nestjs/common';

export class AlreadyExists extends ConflictException {
  constructor(message: string) {
    super(message);
  }
}

import { DomainError } from './domain.error';

export class InvalidStatusError extends DomainError {
  constructor() {
    super('Estado invalido');
  }

}
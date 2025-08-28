import { ApplicationError } from './application.error';

export class InvalidPasswordError extends ApplicationError {
  constructor() {
    super('Invalid password');
  }
}

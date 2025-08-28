import { ApplicationError } from './application.error';

export class InvalidTokenError extends ApplicationError {
  constructor() {
    super('Invalid token');
  }
}

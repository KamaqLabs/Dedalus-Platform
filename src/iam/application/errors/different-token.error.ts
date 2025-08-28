import { ApplicationError } from './application.error';

export class DifferentTokenError extends ApplicationError {
  constructor() {
    super('Token mismatch');
  }
}

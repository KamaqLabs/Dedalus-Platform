import { ApplicationError } from './application.error';

export class UsernameExistsError extends ApplicationError {
  constructor() {
    super('Username already exists');
  }
}

import { ApplicationError } from './application.error';

export class AccountNotFoundError extends ApplicationError {
  constructor() {
    super('Account not found');
  }
}

import { ApplicationError } from './application.error';

export class TokenError extends ApplicationError {
  constructor(error?: any) {
    super(error?.message || 'Invalid or expired token');
  }
}

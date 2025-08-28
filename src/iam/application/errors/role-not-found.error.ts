import { ApplicationError } from './application.error';

export class RoleNotFoundError extends ApplicationError {
  constructor() {
    super('Role not found');
  }
}

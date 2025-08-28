import { ApplicationError } from './application.error';

export class CantChangeAdminRoleError extends ApplicationError {
  constructor() {
    super('Cannot change admin role');
  }
}

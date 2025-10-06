import { DomainError } from './domain.error';

export class InvitationUsedError extends DomainError {
  constructor() {
    super('La invitación ya ha sido utilizada');
  }
}
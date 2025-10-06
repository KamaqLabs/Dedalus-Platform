import {ApplicationError} from "../../../shared/application/Errors/aplication.error";

export class InvitationDoesNotExistsError extends ApplicationError {
  constructor() {
    super('La invitacion no existe');
    this.name = 'InvitationDoesNotExistsError';
  }
}
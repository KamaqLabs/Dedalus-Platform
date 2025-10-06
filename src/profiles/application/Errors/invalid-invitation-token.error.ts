import {ApplicationError} from "../../../shared/application/Errors/aplication.error";


export class InvalidInvitationTokenError extends ApplicationError {
  constructor() {
    super('La invitacion usa un token invalido');
  }

}
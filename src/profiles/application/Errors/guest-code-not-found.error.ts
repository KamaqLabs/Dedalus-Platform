import {ApplicationError} from "../../../shared/application/Errors/aplication.error";

export class GuestCodeNotFoundError extends ApplicationError {
    constructor(guestCode: string) {
        super("El perfil con el Guest Code  " + guestCode + " no fue encontrado.");
    }

}
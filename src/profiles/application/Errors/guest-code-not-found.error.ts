import {ApplicationError} from "../../../iam/application/errors/application.error";

export class GuestCodeNotFoundError extends ApplicationError {
    constructor(guestCode: string) {
        super("El perfil con el Guest Code  " + guestCode + " no fue encontrado.");
    }

}
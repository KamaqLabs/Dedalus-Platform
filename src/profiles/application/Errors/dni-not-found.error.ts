import {ApplicationError} from "../../../iam/application/errors/application.error";

export class DniNotFoundError extends ApplicationError {
    constructor(dni: string) {
        super("El perfil con el DNI " + dni + " no fue encontrado.");
    }

}
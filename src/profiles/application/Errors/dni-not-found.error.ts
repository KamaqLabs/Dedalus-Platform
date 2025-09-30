import {ApplicationError} from "../../../shared/application/Errors/aplication.error";

export class DniNotFoundError extends ApplicationError {
    constructor(dni: string) {
        super("El perfil con el DNI " + dni + " no fue encontrado.");
    }

}
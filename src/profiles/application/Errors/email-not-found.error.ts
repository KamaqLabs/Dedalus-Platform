import {ApplicationError} from "../../../iam/application/errors/application.error";


export class EmailNotFoundError extends ApplicationError {
    constructor(email: string) {
        super("El perfil con el Email  " + email + " no fue encontrado.");
    }

}
import {ApplicationError} from "../../../../iam/application/errors/application.error";

export class RucExistsError extends ApplicationError {
    constructor(ruc: string) {
        super("Ya existe un hotel con el ruc " + ruc + " registrado.");
    }

}
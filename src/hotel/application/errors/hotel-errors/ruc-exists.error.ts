import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";


export class RucExistsError extends ApplicationError {
    constructor(ruc: string) {
        super("Ya existe un hotel con el ruc " + ruc + " registrado.");
    }

}
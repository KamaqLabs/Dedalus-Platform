import {ApplicationError} from "../../../shared/application/Errors/aplication.error";


export class EmailExistsError extends ApplicationError {
    constructor() {
        super('El email ya está en uso.');
    }

}
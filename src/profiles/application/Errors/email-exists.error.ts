import {ApplicationError} from "../../../iam/application/errors/application.error";


export class EmailExistsError extends ApplicationError {
    constructor() {
        super('El email ya está en uso.');
    }

}
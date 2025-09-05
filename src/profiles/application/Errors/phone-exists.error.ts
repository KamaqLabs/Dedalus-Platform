import {ApplicationError} from "../../../iam/application/errors/application.error";


export class PhoneExistsError extends ApplicationError {
    constructor() {
        super('El numero de teléfono ya está en uso.');
    }

}
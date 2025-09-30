import {ApplicationError} from "../../../shared/application/Errors/aplication.error";

export class PhoneExistsError extends ApplicationError {
    constructor() {
        super('El numero de teléfono ya está en uso.');
    }

}
import {ApplicationError} from "../../../../iam/application/errors/application.error";


export class NameExistsError extends ApplicationError {
    constructor(hotelName: string) {
        super("Ya existe un hotel con el nombre " + hotelName + ".");
    }

}
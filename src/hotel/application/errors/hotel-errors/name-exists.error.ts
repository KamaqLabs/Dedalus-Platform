import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";


export class NameExistsError extends ApplicationError {
    constructor(hotelName: string) {
        super("Ya existe un hotel con el nombre " + hotelName + ".");
    }

}
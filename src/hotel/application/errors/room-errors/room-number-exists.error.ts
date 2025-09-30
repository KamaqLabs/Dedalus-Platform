import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";

export class RoomNumberExistsError extends ApplicationError {
    constructor(roomNumber: string) {
        super("Ya existe un Room con el numero " + roomNumber + ".");
    }

}
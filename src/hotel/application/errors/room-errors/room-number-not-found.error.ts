import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";

export class RoomNumberNotFoundError extends ApplicationError {
    constructor(roomNumber: string) {
        super("La habitacion con el room number  " + roomNumber + " no fue encontrado.");
    }

}
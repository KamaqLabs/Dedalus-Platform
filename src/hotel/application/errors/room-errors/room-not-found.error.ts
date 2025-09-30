import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";

export class RoomNotFoundError extends ApplicationError {
    constructor(roomId: number) {
        super("La habitacion con el id  " + roomId + " no fue encontrada.");
    }

}
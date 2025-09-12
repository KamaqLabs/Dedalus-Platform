import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";

export class RoomClassNotFoundError extends ApplicationError {
    constructor(roomClassId: number) {
        super("El RoomClass con el id  " + roomClassId + " no fue encontrado.");
    }

}
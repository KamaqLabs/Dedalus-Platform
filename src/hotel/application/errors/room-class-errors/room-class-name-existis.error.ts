import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";

export class RoomClassNameExistisError extends ApplicationError {
    constructor(roomClassName: string) {
        super("Ya existe un Room Class con el nombre " + roomClassName + ".");
    }

}
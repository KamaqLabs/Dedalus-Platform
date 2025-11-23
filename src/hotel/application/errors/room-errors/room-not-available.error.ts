import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";


export class RoomNotAvailableError extends ApplicationError {
    constructor(roomId: number) {
        super(`La habitación con el id ${roomId} no está disponible`);
    }
}
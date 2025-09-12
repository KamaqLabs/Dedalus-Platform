import {ApplicationError} from "../../../../shared/application/Errors/aplication.error";

export class HotelNotFoundError extends ApplicationError {
    constructor(hotelId: number) {
        super("El Hotel con el id  " + hotelId + " no fue encontrado.");
    }

}
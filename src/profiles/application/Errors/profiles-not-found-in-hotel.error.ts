import {ApplicationError} from "../../../shared/application/Errors/aplication.error";

export class ProfilesNotFoundInHotelError extends ApplicationError {

    constructor(hotelId: number) {
        super("No se encontraron perfiles en el hotel con ID " + hotelId + ".");
    }
}
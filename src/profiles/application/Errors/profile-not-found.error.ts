import {ApplicationError} from "../../../shared/application/Errors/aplication.error";

export class ProfileNotFoundError extends ApplicationError {
    constructor(profileId: number) {
        super("El perfil con ID " + profileId + " no fue encontrado.");
    }

}
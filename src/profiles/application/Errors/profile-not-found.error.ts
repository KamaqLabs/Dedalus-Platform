import {ApplicationError} from "../../../iam/application/errors/application.error";


export class ProfileNotFoundError extends ApplicationError {
    constructor(profileId: number) {
        super("El perfil con ID " + profileId + " no fue encontrado.");
    }

}
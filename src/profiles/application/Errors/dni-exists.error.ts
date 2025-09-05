import {ApplicationError} from "../../../iam/application/errors/application.error";

export class DniExistsError extends ApplicationError {
  constructor() {
    super('Ya existe un usuario con el mismo DNI');
  }

}
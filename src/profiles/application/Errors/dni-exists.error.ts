import {ApplicationError} from "../../../shared/application/Errors/aplication.error";


export class DniExistsError extends ApplicationError {
  constructor() {
    super('Ya existe un usuario con el mismo DNI');
  }

}
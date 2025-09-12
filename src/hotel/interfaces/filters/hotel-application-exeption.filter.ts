import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {ApplicationError} from "../../../shared/application/Errors/aplication.error";
import {NameExistsError} from "../../application/errors/hotel-errors/name-exists.error";
import {RucExistsError} from "../../application/errors/hotel-errors/ruc-exists.error";
import {HotelNotFoundError} from "../../application/errors/hotel-errors/hotel-not-found.error";

@Catch(ApplicationError)
export class HotelApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorName = 'Internal Server Error';

        if (exception instanceof NameExistsError) {
            statusCode = HttpStatus.BAD_REQUEST;
            errorName = NameExistsError.name;
        }
        else if (exception instanceof RucExistsError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = RucExistsError.name;
        }
        else if (exception instanceof HotelNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = HotelNotFoundError.name;
        }

        response
            .status(statusCode)
            .json({
                statusCode,
                error: errorName,
                message: exception.message
            });
    }
}
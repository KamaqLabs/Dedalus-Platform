import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from "../../../shared/application/Errors/aplication.error";
import { HotelNotFoundError } from "../../application/errors/hotel-errors/hotel-not-found.error";
import { RoomClassNotFoundError } from "../../application/errors/room-class-errors/room-class-not-found.error";
import { RoomNotFoundError } from "../../application/errors/room-errors/room-not-found.error";
import { RoomNumberExistsError } from "../../application/errors/room-errors/room-number-exists.error";
import { RoomNumberNotFoundError } from "../../application/errors/room-errors/room-number-not-found.error";

@Catch(ApplicationError)
export class RoomApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorName = 'Internal Server Error';

        if (exception instanceof HotelNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = HotelNotFoundError.name;
        }
        else if (exception instanceof RoomClassNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = RoomClassNotFoundError.name;
        }
        else if (exception instanceof RoomNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = RoomNotFoundError.name;
        }
        else if (exception instanceof RoomNumberExistsError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = RoomNumberExistsError.name;
        }
        else if (exception instanceof RoomNumberNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = RoomNumberNotFoundError.name;
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

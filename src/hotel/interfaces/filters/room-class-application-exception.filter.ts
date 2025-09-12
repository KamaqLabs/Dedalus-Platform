import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from "../../../shared/application/Errors/aplication.error";
import { RoomClassNameExistisError } from "../../application/errors/room-class-errors/room-class-name-existis.error";
import { RoomClassNotFoundError } from "../../application/errors/room-class-errors/room-class-not-found.error";
import {HotelNotFoundError} from "../../application/errors/hotel-errors/hotel-not-found.error";

@Catch(ApplicationError)
export class RoomClassApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorName = 'Internal Server Error';

        if (exception instanceof RoomClassNameExistisError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = RoomClassNameExistisError.name;
        }
        else if (exception instanceof RoomClassNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = RoomClassNotFoundError.name;
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

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApplicationError } from "../../../shared/application/Errors/aplication.error";
import { DniExistsError } from "../../application/Errors/dni-exists.error";
import { DniNotFoundError } from "../../application/Errors/dni-not-found.error";
import { EmailExistsError } from "../../application/Errors/email-exists.error";
import { EmailNotFoundError } from "../../application/Errors/email-not-found.error";
import { GuestCodeNotFoundError } from "../../application/Errors/guest-code-not-found.error";
import { PhoneExistsError } from "../../application/Errors/phone-exists.error";
import { ProfileNotFoundError } from "../../application/Errors/profile-not-found.error";

@Catch(ApplicationError)
export class ProfileApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorName = 'Internal Server Error';

        if (exception instanceof DniExistsError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = DniExistsError.name;
        }
        else if (exception instanceof EmailExistsError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = EmailExistsError.name;
        }
        else if (exception instanceof PhoneExistsError) {
            statusCode = HttpStatus.CONFLICT;
            errorName = PhoneExistsError.name;
        }
        else if (exception instanceof DniNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = DniNotFoundError.name;
        }
        else if (exception instanceof EmailNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = EmailNotFoundError.name;
        }
        else if (exception instanceof GuestCodeNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = GuestCodeNotFoundError.name;
        }
        else if (exception instanceof ProfileNotFoundError) {
            statusCode = HttpStatus.NOT_FOUND;
            errorName = ProfileNotFoundError.name;
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

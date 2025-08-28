import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ApplicationError } from '../../application/errors/application.error';
import { AccountNotFoundError } from '../../application/errors/account-not-found.error';
import { InvalidPasswordError } from '../../application/errors/invalid-password.error';
import { Response } from 'express';
import { UsernameExistsError } from '../../application/errors/username-exists.error';
import { DifferentTokenError } from '../../application/errors/different-token.error';
import { TokenError } from '../../application/errors/token.error';
import { InvalidTokenError } from '../../application/errors/invalid-token.error';
import { RoleNotFoundError } from '../../application/errors/role-not-found.error';
import { CantChangeAdminRoleError } from '../../application/errors/cant-change-admin-role.error';

@Catch(ApplicationError)
export class IamApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorName = 'Internal Server Error';

    if(exception instanceof AccountNotFoundError){
      statusCode = HttpStatus.NOT_FOUND;
      errorName = AccountNotFoundError.name;
    }
    else if(exception instanceof UsernameExistsError) {
       statusCode = HttpStatus.BAD_REQUEST;
       errorName = UsernameExistsError.name;
    }
    else if(exception instanceof DifferentTokenError) {
      console.log('catching different token error');
        statusCode = HttpStatus.BAD_REQUEST;
        errorName = DifferentTokenError.name;
    }
    else if(exception instanceof InvalidPasswordError){
      statusCode = HttpStatus.BAD_REQUEST;
      errorName = InvalidPasswordError.name;
    }
    else if (exception instanceof TokenError) {
      console.log('is it');
      statusCode = HttpStatus.BAD_REQUEST;
      errorName = TokenError.name;
    }
    else if (exception instanceof InvalidTokenError) {
      statusCode = HttpStatus.UNAUTHORIZED;
      errorName = InvalidTokenError.name;
    }
    else if (exception instanceof RoleNotFoundError) {
      statusCode = HttpStatus.NOT_FOUND;
      errorName = RoleNotFoundError.name;
    }
    else if (exception instanceof CantChangeAdminRoleError) {
      statusCode = HttpStatus.FORBIDDEN;
      errorName = CantChangeAdminRoleError.name;
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

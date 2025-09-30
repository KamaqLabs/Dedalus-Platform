import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies?.token;




    if (!token) {
      throw new UnauthorizedException('No authentication token found in cookies');
    }

    console.log('Token found in cookies:', token);

    return super.canActivate(context);
  }

}


/*
if (!token) {
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
    }
}*/

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {Request} from 'express';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{
    constructor(configService: ConfigService) {
        const isDevelopment = configService.get<string>('NODE_ENV') === 'development';
        const jwtExtractor = isDevelopment ? ExtractJwt
            .fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), extractTokenFromCookies]) : ExtractJwt.fromExtractors([extractTokenFromCookies]);
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }

        super({
            jwtFromRequest: jwtExtractor,
            secretOrKey: jwtSecret,
            ignoreExpiration: false,
        });
    }

    async validate(payload: any){
        if (!payload || !payload.id) {
            throw new UnauthorizedException('Invalid token payload');
        }
        return {
            id: payload.id,
            username: payload.username,
            rol: payload.rol
        }
    }
}
/*
@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractRefreshToken]),
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  validate(payload: any) {
    return {
      id: payload.id,
      username: payload.username,
      rol: payload.rol
    };
  }
}*/


function extractTokenFromCookies(req: Request): string | null {
    return req.cookies?.token || null;
}

function extractRefreshToken(req: Request): string | null {
    return req.cookies?.refreshToken || null;
}
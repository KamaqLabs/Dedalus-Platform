import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthJwtService } from './jwt/auth-jwt.service';
import { JwtStrategy } from '../../../shared/infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // Cambiar de JWT_REFRESH_SECRET a JWT_SECRET
        signOptions: {
          expiresIn: '15m'
        } // Cambiar de 60s a un tiempo más razonable
      })
    })
  ],
  providers: [AuthJwtService, JwtStrategy],
  exports: [AuthJwtService, JwtStrategy], // Exportar también JwtStrategy
})
export class AuthModule {}

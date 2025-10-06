import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './tokens.type';
import { ConfigService } from '@nestjs/config';

type JwtResult = { ok: true, value: { id: number, username: string, rol:string } }
  | { ok: false, error: string };

@Injectable()
export class AuthJwtService {
  constructor(private readonly jwtService: JwtService,
              private readonly configService: ConfigService) { }

  public async generateToken(account: {id: number, username: string, rol: string}): Promise<Tokens> {



    const payload = { id: account.id, username: account.username, rol: account.rol }

    const accessToken = this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('EXPIRES_IN') });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken
    }
  }

  public async createTokenForInvitation(payload: { email: string, jti: string }) {
    return this.jwtService.sign(payload, { expiresIn: '24h' });
  }



  public async verifyAuthorizationToken(token: string): Promise<JwtResult> {
    try {
      const payload = this.jwtService.verify(token);
      return { ok: true, value: payload };
    } catch (error) {
      return { ok: false, error: (error as Error).message };
    }
  }

  //TODO: Use the promise <Jwt> or something like that to catch the error in the application layer
  public async verifyInvitationToken(token: string): Promise<{ email: string, jti: string}>{
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      console.error(`An error occurred while verifying the invitation token: ${error}`);
      return null;
    }
  }

}


// async refreshToken(oldRefreshToken: string
//                    , account: {id: number, username: string, rol: string}): Promise<Tokens> {
//   try {
//     const payload = this.jwtService.verify(oldRefreshToken);
//     const newPayload = { id: account.id, username: account.username, rol: account.rol };
//     const newAccessToken = this.jwtService.sign(newPayload, { expiresIn: '15m' });
//     const newRefreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' });
//
//     return {
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken
//     }
//   } catch (error) {
//     throw new Error(`An error occurred while refreshing the token: ${error}`);
//   }
// }
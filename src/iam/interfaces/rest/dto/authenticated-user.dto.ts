export class AuthenticatedUserDto {
  token: string;
  refreshToken: string;
  profileId: number;
  username: string;
  rol: string;

  constructor(data: { token: string, refreshToken: string, profileId: number, username: string, rol: string }) {
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    this.profileId = data.profileId;
    this.username = data.username;
    this.rol = data.rol;
  }
}
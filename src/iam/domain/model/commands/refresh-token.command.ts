export class RefreshTokenCommand {
  public readonly refreshToken: string;
  constructor( refreshToken: string ) {
    this.refreshToken = refreshToken;
  }
}
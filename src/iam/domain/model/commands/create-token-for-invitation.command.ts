export class CreateTokenForInvitationCommand {
  public readonly email: string;
  public readonly jti: string;

  constructor(email: string, jti: string) {
    this.email = email;
    this.jti = jti;
  }
}
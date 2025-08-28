export class CreateTokenForInvitationCommand {
  public readonly athleteType: string;
  public readonly availableSessions: number;
  public readonly jti: string;

  constructor(athleteType: string, availableSessions: number, jti: string) {
    this.athleteType = athleteType;
    this.availableSessions = availableSessions;
    this.jti = jti;
  }
}
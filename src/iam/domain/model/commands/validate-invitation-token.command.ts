export class ValidateInvitationTokenCommand {
  public readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
export class GetInvitationInformationQuery {
  public readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
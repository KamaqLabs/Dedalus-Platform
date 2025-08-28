export class RememberIdentityInformationCommand {
  public readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
}
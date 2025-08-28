export class LogoutCommand {
  public readonly accountId: number;
  constructor( accountId: number ) {
    this.accountId = accountId;
  }
}
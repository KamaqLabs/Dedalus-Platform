export class ChangePasswordCommand {
  public readonly accountId: number;
  public readonly newPassword: string;
  constructor(accountId: number, newPassword: string ) {
    this.accountId = accountId;
    this.newPassword = newPassword;
  }
}
export class DeleteAccountCommand {
  public readonly accountId: number;
  constructor(data: { accountId: number }) {
    this.accountId = data.accountId;
  }
}
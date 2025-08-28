export class UpdateAccountRoleCommand {
  constructor(
    public readonly accountId: number,
    public readonly role: string
  ) {}
}
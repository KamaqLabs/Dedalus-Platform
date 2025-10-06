export class GetUsedInvitationByTokenIdQuery {
  public readonly tokenId: string;

  constructor(tokenId: string) {
    this.tokenId = tokenId;
  }
}

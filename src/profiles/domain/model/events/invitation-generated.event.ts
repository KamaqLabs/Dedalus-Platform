// invitations/domain/events/invitation-generated.event.ts
export class InvitationGeneratedEvent {
  constructor(
    public readonly tokenId: string,
    public readonly expiresAt: Date,
  ) {}
}

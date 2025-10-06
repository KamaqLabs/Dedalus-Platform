import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvitationGeneratedEvent } from '../../../domain/model/events/invitation-generated.event';
import { InvitationCommandService } from '../commandservices/invitation-command.service';

@EventsHandler(InvitationGeneratedEvent)
export class InvitationGeneratedHandler implements IEventHandler<InvitationGeneratedEvent> {
  constructor(
    private readonly invitationCommandService: InvitationCommandService
  ) {}

  async handle(event: InvitationGeneratedEvent) {
    await this.invitationCommandService.createInvitation(
      event.tokenId,
      event.expiresAt
    );
  }
}

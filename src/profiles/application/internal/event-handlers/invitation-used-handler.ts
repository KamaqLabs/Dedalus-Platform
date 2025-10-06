import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvitationUsedEvent } from '../../../domain/model/events/invitation-used.event';
import { InvitationCommandService } from '../commandservices/invitation-command.service';

@EventsHandler(InvitationUsedEvent)
export class InvitationUsedHandler implements IEventHandler<InvitationUsedEvent> {
  constructor(
    private readonly invitationCommandService: InvitationCommandService
  ) {}
  async handle(event: InvitationUsedEvent) {
    await this.invitationCommandService.markAsUsed(
      event.tokenId
    );
  }
}

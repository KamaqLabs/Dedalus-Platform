import { Inject, Injectable } from '@nestjs/common';
import { IInvitationRepository } from '../../../domain/repositories/i-invitation-repository';
import { Invitation } from '../../../domain/model/aggregates/invitation';
import { IInvitationCommandService } from '../../../domain/services/i-invitation-command-service';
import { InvalidInvitationTokenError } from '../../errors/invalid-invitation-token.error';
import { InvitationDoesNotExistsError } from '../../errors/invitation-does-not-exists.error';
import { INVITATION_REPOSITORY_TOKEN } from '../../../domain/repositories/invitation-repository.token';

@Injectable()
export class InvitationCommandService implements IInvitationCommandService{
  constructor(
    @Inject(INVITATION_REPOSITORY_TOKEN)
    private readonly invitationRepository: IInvitationRepository<Invitation>,
  ) {
  }

  async createInvitation(tokenId: string, expiresAt: Date): Promise<Invitation> {
    const invitation: Invitation = new Invitation();
    invitation.tokenId = tokenId;
    invitation.expiresAt = expiresAt;
    invitation.used = false;

    return await this.invitationRepository.addAsync(invitation);
  }

  deleteInvitation(tokenId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  expireInvitation(tokenId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  async markAsUsed(tokenId: string): Promise<void> {
    const invitation: Invitation = await this.invitationRepository.findByTokenId(tokenId);
    if(!invitation) throw new InvitationDoesNotExistsError();

    const isExpired = invitation.isExpired();
    if(isExpired) throw new InvalidInvitationTokenError();

    invitation.markAsUsed()
    await this.invitationRepository.updateAsync(invitation);
  }

  revokeInvitation(tokenId: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}

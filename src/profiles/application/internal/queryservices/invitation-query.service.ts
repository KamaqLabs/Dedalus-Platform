import { Inject, Injectable } from '@nestjs/common';
import { INVITATION_REPOSITORY_TOKEN } from '../../../domain/repositories/invitation-repository.token';
import { IInvitationRepository } from '../../../domain/repositories/i-invitation-repository';
import { Invitation } from '../../../domain/model/aggregates/invitation';
import { IInvitationQueryService } from '../../../domain/services/i-invitation-query-service';
import { GetUsedInvitationByTokenIdQuery } from '../../../domain/model/queries/get-used-invitation-by-token-id.query';

@Injectable()
export class InvitationQueryService implements IInvitationQueryService {
  constructor(
    @Inject(INVITATION_REPOSITORY_TOKEN)
    private readonly invitationRepository: IInvitationRepository<Invitation>,
  ) {
  }

  async getUsedInvitationByTokenId(query: GetUsedInvitationByTokenIdQuery): Promise<Invitation> {
    return await this.invitationRepository.findByTokenId(query.tokenId);
  }
}

import { Invitation } from '../model/aggregates/invitation';
import { GetUsedInvitationByTokenIdQuery } from '../model/queries/get-used-invitation-by-token-id.query';

export interface IInvitationQueryService {
  getUsedInvitationByTokenId(query: GetUsedInvitationByTokenIdQuery): Promise<Invitation>;
}

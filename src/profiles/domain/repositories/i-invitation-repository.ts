import { Invitation } from '../model/aggregates/invitation';
import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';

export interface IInvitationRepository<Invitation> extends IBaseRepository<Invitation> {
  findByTokenId(tokenId: string): Promise<Invitation | null>;
}

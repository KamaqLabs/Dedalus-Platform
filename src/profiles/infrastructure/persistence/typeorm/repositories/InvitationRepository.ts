import { BaseRepository } from '../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository';
import { Invitation } from '../../../../domain/model/aggregates/invitation';
import { IInvitationRepository } from '../../../../domain/repositories/i-invitation-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvitationRepository extends BaseRepository<Invitation>
  implements IInvitationRepository<Invitation> {
  constructor(
    @InjectRepository(Invitation) private readonly invitationRepository: Repository<Invitation>
  ) {
    super(invitationRepository);
  }

  async findByTokenId(tokenId: string): Promise<Invitation | null> {
    return await this.invitationRepository.findOne({ where: { tokenId } });
  }

  async findUsedInvitationByTokenId(tokenId: string): Promise<Invitation | null> {
    return await this.invitationRepository.findOne({ where: { tokenId, used: true } });
  }

}
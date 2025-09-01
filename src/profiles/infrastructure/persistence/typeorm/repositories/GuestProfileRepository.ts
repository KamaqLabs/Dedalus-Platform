import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestProfile } from '../../../../domain/model/aggregates/Guest-Profile';
import { IGuestProfileRepository } from '../../../../domain/repositories/i-guest-profile-repository';
import { BaseRepository } from '../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository';

@Injectable()
export class GuestProfileRepository extends BaseRepository<GuestProfile>
  implements IGuestProfileRepository<GuestProfile> {
  constructor(
    @InjectRepository(GuestProfile)
    private readonly guestProfileRepository: Repository<GuestProfile>
  ) {
    super(guestProfileRepository);
  }

  async findGuestProfileByGuestCode(guestCode: string): Promise<GuestProfile | null> {
    return this.guestProfileRepository.findOne({ where: { guestCode } });
  }

  async findGuestProfileById(id: number): Promise<GuestProfile | null> {
    return this.guestProfileRepository.findOne({ where: { id } });
  }
}


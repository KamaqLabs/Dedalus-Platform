import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuestProfile } from '../../../../domain/model/aggregates/Guest-Profile';
import { IGuestProfileRepository } from '../../../../domain/repositories/i-guest-profile-repository';
import { BaseRepository } from '../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository';
import {EStatus} from "../../../../domain/model/value-objects/e-status";

@Injectable()
export class GuestProfileRepository extends BaseRepository<GuestProfile>
  implements IGuestProfileRepository<GuestProfile> {
  constructor(
    @InjectRepository(GuestProfile)
    private readonly guestProfileRepository: Repository<GuestProfile>
  ) {
    super(guestProfileRepository);
  }

    findGuestProfileByAccountId(accountId: number): Promise<GuestProfile> {
        return this.guestProfileRepository.findOne({ where: { accountId } });
    }

    async findGuestProfileByDni(dni: string): Promise<GuestProfile> {
        return this.guestProfileRepository.findOne({ where: { dni } });
    }

    async findGuestProfileByEmail(email: string): Promise<GuestProfile> {
        return this.guestProfileRepository.findOne({ where: { email } });
    }

    async findGuestProfileByGuestCode(guestCode: string): Promise<GuestProfile | null> {
        return this.guestProfileRepository.findOne({ where: { guestCode } });
    }

    async findGuestProfileByStatus(status: EStatus): Promise<GuestProfile[]> {
        return this.guestProfileRepository.find({ where: { status } });
    }

    async findAllGuestProfiles(): Promise<GuestProfile[]> {
        return this.guestProfileRepository.find();
    }

}


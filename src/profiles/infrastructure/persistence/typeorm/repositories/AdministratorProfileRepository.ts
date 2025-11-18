import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {AdministratorProfile} from "../../../../domain/model/aggregates/Administrator-profile";
import { IAdministratorProfileRepository } from '../../../../domain/repositories/i-administrator-profile-repository';
import { BaseRepository } from '../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository';

@Injectable()
export class AdministratorProfileRepository extends BaseRepository<AdministratorProfile>
  implements IAdministratorProfileRepository<AdministratorProfile> {
  constructor(
    @InjectRepository(AdministratorProfile)
    private readonly administratorProfileRepository: Repository<AdministratorProfile>
  ) {
    super(administratorProfileRepository);
  }

    async findProfileByAccountIdAsync(accountId: number): Promise<AdministratorProfile | null> {
      return this.administratorProfileRepository.findOne({ where: { accountId } });
    }

    async findAdministratorProfileByEmailAsync(email: string): Promise<AdministratorProfile | null> {
      return this.administratorProfileRepository.findOne({ where: { email } });
    }

    async findAdministratorByDniAsync(dni: string): Promise<AdministratorProfile | null> {
      return this.administratorProfileRepository.findOne({ where: { dni } });
    }

    async findAdministratorByAccountId(accountId: number): Promise<AdministratorProfile | null> {
      return this.administratorProfileRepository.findOne({ where: { accountId } });
    }

    async findAdministratorsByHotelId(hotelId: number): Promise<AdministratorProfile[]> {
      return this.administratorProfileRepository.find({ where: { hotelId } });
    }


}


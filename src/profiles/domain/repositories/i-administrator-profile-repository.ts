import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';

export interface IAdministratorProfileRepository<AdministratorProfile> extends IBaseRepository<AdministratorProfile> {
    findProfileByAccountIdAsync(accountId: number): Promise<AdministratorProfile | null>;
    findAllProfileByHotelIdAsync(hotelId: number): Promise<AdministratorProfile[]>;
    findProfileByIdAsync(id: number): Promise<AdministratorProfile>;
}


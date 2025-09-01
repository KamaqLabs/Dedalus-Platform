import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';


export interface IGuestProfileRepository<GuestProfile> extends IBaseRepository<GuestProfile> {
    findGuestProfileByGuestCode(guestCode: string): Promise<GuestProfile | null>;
    findGuestProfileById(id: number): Promise<GuestProfile | null>;
}
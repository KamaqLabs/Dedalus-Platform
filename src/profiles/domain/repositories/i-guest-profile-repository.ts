import { IBaseRepository } from '../../../shared/domain/repositories/i-base-repository';
import {EStatus} from "../model/value-objects/e-status";
import {GuestProfile} from "../model/aggregates/Guest-Profile";


export interface IGuestProfileRepository<GuestProfile> extends IBaseRepository<GuestProfile> {
    findGuestProfileByGuestCode(guestCode: string): Promise<GuestProfile | null>;
    findGuestProfileByDni(dni: string): Promise<GuestProfile | null>;
    findGuestProfileByEmail(email: string): Promise<GuestProfile | null>;
    findGuestProfileByStatus(status: EStatus): Promise<GuestProfile[]>;
    findAllGuestProfiles(): Promise<GuestProfile[]>
}
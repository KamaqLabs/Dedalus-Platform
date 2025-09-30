import { GetGuestProfileByGuestCodeQuery } from '../model/queries/get-guest-profile-by-guest-code.query';
import { GetGuestProfileByIdQuery } from '../model/queries/get-guest-profile-by-id.query';
import { GuestProfile } from '../model/aggregates/Guest-Profile';

export interface IGuestProfileQueryService {
    HandleGetGuestProfileByGuestCode(query: GetGuestProfileByGuestCodeQuery): Promise<GuestProfile | null>;
    HandleGetGuestProfileById(query: GetGuestProfileByIdQuery): Promise<{guestProfile:GuestProfile, username: string}>;
    HandleGetAllGuestProfiles(): Promise<GuestProfile[]>;
    HandleGetAllActiveGuestProfiles(): Promise<GuestProfile[]>;
    HandleGetAllInactiveGuestProfiles(): Promise<GuestProfile[]>;
    HandleGetGuestProfilesByWord(word: string): Promise<GuestProfile[]>;
    HandleGetGuestProfileByDni(dni: string): Promise<GuestProfile | null>;
    HandleGetGuestProfileByEmail(email: string): Promise<GuestProfile | null>;
    HandleGetGuestProfilesByStatus(status: string): Promise<GuestProfile[]>;
    HandleGetGuestProfileByAccountId(accountId: number): Promise<{guestProfile: GuestProfile, username: string}>;

}



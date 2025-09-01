import { GetGuestProfileByGuestCodeQuery } from '../model/queries/get-guest-profile-by-guest-code.query';
import { GetGuestProfileByIdQuery } from '../model/queries/get-guest-profile-by-id.query';
import { GuestProfile } from '../model/aggregates/Guest-Profile';

export interface IGuestProfileQueryService {
    HandleGetGuestProfileByGuestCode(query: GetGuestProfileByGuestCodeQuery): Promise<GuestProfile | null>;
    HandleGetGuestProfileById(query: GetGuestProfileByIdQuery): Promise<GuestProfile | null>;
}


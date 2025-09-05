import { CreateGuestProfileCommand } from '../model/commands/create-guest-profile.command';
import { UpdateGuestPersonalInformationCommand } from '../model/commands/update-guest-personal-information.command';
import { DeleteGuestProfileCommand } from '../model/commands/delete-guest-profile.command';
import { ChangeGuestProfileStatusCommand } from '../model/commands/change-guest-profile-status.command';
import { AddGuestNfcKeyCommand } from '../model/commands/add-guest-nfc-key.command';
import { DestroyGuestNfcKeyCommand } from '../model/commands/destroy-guest-nfc-key.command';
import {GuestProfile} from "../model/aggregates/Guest-Profile";

export interface IGuestProfileCommandService {
    HandleCreateGuestProfile(command: CreateGuestProfileCommand): Promise<{guestProfile: GuestProfile, username: string}>;
    HandleUpdateGuestPersonalInformation(command: UpdateGuestPersonalInformationCommand, guestId:number): Promise<{ guestProfile: GuestProfile, username: string }>
    HandleDeleteGuestProfile(command: DeleteGuestProfileCommand): void;
    HandleChangeGuestProfileStatus(command: ChangeGuestProfileStatusCommand):  Promise<GuestProfile>;
    HandleAddGuestNfcKey(command: AddGuestNfcKeyCommand):  Promise<GuestProfile>;
    HandleDestroyGuestNfcKey(command: DestroyGuestNfcKeyCommand):  Promise<GuestProfile>;

    HandleActivateGuestProfile(guestProfileId: number): Promise<GuestProfile>;
    HandleDeactivateGuestProfile(guestProfileId: number): Promise<GuestProfile>;

}


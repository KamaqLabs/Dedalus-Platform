import { CreateGuestProfileCommand } from '../model/commands/create-guest-profile.command';
import { UpdateGuestPersonalInformationCommand } from '../model/commands/update-guest-personal-information.command';
import { DeleteGuestProfileCommand } from '../model/commands/delete-guest-profile.command';
import { ChangeGuestProfileStatusCommand } from '../model/commands/change-guest-profile-status.command';
import { AddGuestNfcKeyCommand } from '../model/commands/add-guest-nfc-key.command';
import { DestroyGuestNfcKeyCommand } from '../model/commands/destroy-guest-nfc-key.command';
import {GuestProfile} from "../model/aggregates/Guest-Profile";

export interface IGuestProfileCommandService {
    HandleCreateGuestProfile(command: CreateGuestProfileCommand): Promise<{guestProfile: GuestProfile}>;
    HandleUpdateGuestPersonalInformation(command: UpdateGuestPersonalInformationCommand):  Promise<{guestProfile: GuestProfile}>;
    HandleDeleteGuestProfile(command: DeleteGuestProfileCommand): Promise<{guestProfile: GuestProfile}>;
    HandleChangeGuestProfileStatus(command: ChangeGuestProfileStatusCommand): Promise<{guestProfile: GuestProfile}>;
    HandleAddGuestNfcKey(command: AddGuestNfcKeyCommand): Promise<{guestProfile: GuestProfile}>;
    HandleDestroyGuestNfcKey(command: DestroyGuestNfcKeyCommand): Promise<{guestProfile: GuestProfile}>;
}


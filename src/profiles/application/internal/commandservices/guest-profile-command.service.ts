import { GuestProfile } from "src/profiles/domain/model/aggregates/Guest-Profile";
import { AddGuestNfcKeyCommand } from "src/profiles/domain/model/commands/add-guest-nfc-key.command";
import { ChangeGuestProfileStatusCommand } from "src/profiles/domain/model/commands/change-guest-profile-status.command";
import { CreateGuestProfileCommand } from "src/profiles/domain/model/commands/create-guest-profile.command";
import { DeleteGuestProfileCommand } from "src/profiles/domain/model/commands/delete-guest-profile.command";
import { DestroyGuestNfcKeyCommand } from "src/profiles/domain/model/commands/destroy-guest-nfc-key.command";
import { UpdateGuestPersonalInformationCommand } from "src/profiles/domain/model/commands/update-guest-personal-information.command";
import {IGuestProfileCommandService} from "../../../domain/services/i-guest-profile-command-service";
import {Inject, Injectable} from "@nestjs/common";
import {GUEST_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/guest-profile-repository.token";
import {IGuestProfileRepository} from "../../../domain/repositories/i-guest-profile-repository";
import {ExternalIamService} from "../outbound-service/external-iam.service";
import {DniExistsError} from "../../Errors/dni-exists.error";
import {EmailExistsError} from "../../Errors/email-exists.error";
import {ProfileNotFoundError} from "../../Errors/profile-not-found.error";
@Injectable()
export class GuestProfileCommandService implements IGuestProfileCommandService {
    constructor(
        @Inject(GUEST_PROFILE_REPOSITORY_TOKEN)
        private readonly guestProfileRepository: IGuestProfileRepository<GuestProfile>,
        @Inject() private readonly externalIamService: ExternalIamService,

    ) {}


    async HandleCreateGuestProfile(command: CreateGuestProfileCommand): Promise<{ guestProfile: GuestProfile, username:string; }> {
        let accountId =0;
        try{
            const profileFoundByDni = await this.guestProfileRepository.findGuestProfileByDni(command.dni);
            if(profileFoundByDni) throw new DniExistsError();
            const profileFoundByEmail = await this.guestProfileRepository.findGuestProfileByEmail(command.email);
            if(profileFoundByEmail) throw new EmailExistsError();

            accountId = await this.externalIamService.createAccount(command.username,command.password,"GUEST");

            const guestProfile = GuestProfile.ConstructGuestProfileFromCommand(command);
            guestProfile.setAccountId(accountId);

            const persistedGuestProfile = await this.guestProfileRepository.addAsync(guestProfile);
            return{
                guestProfile: persistedGuestProfile,
                username : command.username
            }
        }catch (error) {

            if(accountId) {
                try {
                    await this.externalIamService.deleteAccount(accountId);
                } catch (error) {
                    console.error('Error deleting account', error);
                }
            }
            throw error;
        } finally {
        }
    }
    public async HandleUpdateGuestPersonalInformation(command: UpdateGuestPersonalInformationCommand, guestId: number): Promise<{ guestProfile: GuestProfile, username: string }> {

        const guestProfile = await this.guestProfileRepository.findByIdAsync(guestId);
        if(!guestProfile) throw new ProfileNotFoundError(guestId);
        guestProfile.UpdatePersonalInformation(command);
        const username = await this.externalIamService.obtainUsernameByAccountId(guestProfile.accountId);
        const updatedProfile = await this.guestProfileRepository.updateAsync(guestProfile);

        return {
            guestProfile: updatedProfile,
            username: username
        };
    }
    public async HandleDeleteGuestProfile(command: DeleteGuestProfileCommand): Promise<void> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(command.guestProfileId);
        if(!guestProfile) throw new ProfileNotFoundError(command.guestProfileId);

        await this.guestProfileRepository.deleteAsync(guestProfile);
    }
    public async HandleChangeGuestProfileStatus(command: ChangeGuestProfileStatusCommand):  Promise<GuestProfile> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(command.guestProfileId);
        if(!guestProfile) throw new ProfileNotFoundError(command.guestProfileId);
        if(command.status === 'INACTIVE') guestProfile.DeactivateGuestProfile();
        if(command.status === 'ACTIVE') guestProfile.ActiveGuestProfile();
        return await this.guestProfileRepository.updateAsync(guestProfile);
    }
    public async HandleAddGuestNfcKey(command: AddGuestNfcKeyCommand): Promise<GuestProfile> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(command.guestProfileId);
        if(!guestProfile) throw new ProfileNotFoundError(command.guestProfileId);
        guestProfile.AssignNfcKey(command.nfcKey);
        return await this.guestProfileRepository.updateAsync(guestProfile);
    }
    public async HandleDestroyGuestNfcKey(command: DestroyGuestNfcKeyCommand): Promise<GuestProfile> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(command.guestProfileId);
        if(!guestProfile) throw new ProfileNotFoundError(command.guestProfileId);
        guestProfile.DestroyNfcKey();
        return await this.guestProfileRepository.updateAsync(guestProfile);
    }

    async HandleActivateGuestProfile(guestProfileId: number): Promise<GuestProfile> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(guestProfileId);
        if (!guestProfile) {
            throw new ProfileNotFoundError(guestProfileId);
        }
        guestProfile.ActiveGuestProfile();
        return await this.guestProfileRepository.updateAsync(guestProfile);
    }

    async HandleDeactivateGuestProfile(guestProfileId: number): Promise<GuestProfile> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(guestProfileId);
        if (!guestProfile) {
            throw new ProfileNotFoundError(guestProfileId);
        }
        guestProfile.DeactivateGuestProfile();
        return await this.guestProfileRepository.updateAsync(guestProfile);
    }
}
import {Inject, Injectable} from "@nestjs/common";
import {GuestProfileQueryService} from "../../application/internal/queryservices/guest-profile-query.service";
import {GuestProfile} from "../../domain/model/aggregates/Guest-Profile";
import {GetGuestProfileByIdQuery} from "../../domain/model/queries/get-guest-profile-by-id.query";
import {GetGuestProfileByGuestCodeQuery} from "../../domain/model/queries/get-guest-profile-by-guest-code.query";
import {GetAdministratorProfileByIdQuery} from "../../domain/model/queries/get-administrator-profile-by-id.query";
import {
    AdministratorProfileQueryService
} from "../../application/internal/queryservices/administrator-profile-query.service";
import {AdministratorProfile} from "../../domain/model/aggregates/Administrator-profile";
import {GuestProfileCommandService} from "../../application/internal/commandservices/guest-profile-command.service";
import {AddGuestNfcKeyCommand} from "../../domain/model/commands/add-guest-nfc-key.command";


@Injectable()
export class ProfileContextFacadeService {
    constructor(
        @Inject()
        private readonly guestProfileQueryService: GuestProfileQueryService,
        @Inject()
        readonly administratorProfileQueryService: AdministratorProfileQueryService,
        @Inject()
        readonly guestProfileCommandService: GuestProfileCommandService
    ) {
    }

    public async FetchGuestProfileById(guestId: number): Promise<GuestProfile> {
        const query = new GetGuestProfileByIdQuery(guestId);
        const guestInformation =
            await this.guestProfileQueryService.HandleGetGuestProfileById(query);

        return guestInformation?.guestProfile ?? null;
    }

    public async IsGuestProfileExistById(guestId: number): Promise<boolean> {
        const query = new GetGuestProfileByIdQuery(guestId);
        const guestInformation =
            await this.guestProfileQueryService.HandleGetGuestProfileById(query);

        return !!guestInformation?.guestProfile;
    }


    public async IsGuestProfileExistByGuestCode(guestCode: string): Promise<boolean> {
        const query = new GetGuestProfileByGuestCodeQuery(guestCode);
        const guestInformation =
            await this.guestProfileQueryService.HandleGetGuestProfileByGuestCode(query);

        return !!guestInformation;
    }

    public async AddNfcKeyToGuestProfile(guestProfileId: number, nfcKey: string): Promise<void> {
        const guestProfile = await this.FetchGuestProfileById(guestProfileId);
        if (!guestProfile) {
            throw new Error('Guest profile not found');
        }
        guestProfile.AssignNfcKey(nfcKey);
        const data = { guestProfileId, nfcKey };
        await this.guestProfileCommandService.HandleAddGuestNfcKey(new AddGuestNfcKeyCommand(data));
        // Here you would typically save the updated guest profile back to the repository
    }

    //administrator profile methods will be here

    public async isAdminExist(administratorId: number): Promise<boolean> {
        console.log(administratorId);
        const query = new GetAdministratorProfileByIdQuery(administratorId);
        const administratorProfile =
            await this.administratorProfileQueryService.HandleGetAdministratorProfileById(
                query,
            );
        return (!!administratorProfile);

    }

    public async getAdministratorInformation(
        administratorId: number,
    ): Promise<AdministratorProfile> {
        const query = new GetAdministratorProfileByIdQuery(administratorId);
        return await this.administratorProfileQueryService.HandleGetAdministratorProfileById(
            query,
        );
    }
}
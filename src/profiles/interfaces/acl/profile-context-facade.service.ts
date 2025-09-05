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


@Injectable()
export class ProfileContextFacadeService {
    constructor(
        @Inject()
        private readonly guestProfileQueryService: GuestProfileQueryService,
        @Inject()
        readonly administratorProfileQueryService: AdministratorProfileQueryService
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

        return guestInformation?.guestProfile ? true : false;
    }

    public async IsGuestProfileExistByDni(dni: string): Promise<boolean> {
        const guestInformation =
            await this.guestProfileQueryService.HandleGetGuestProfileByDni(dni);

        return guestInformation ? true : false;
    }

    public async IsGuestProfileExistByGuestCode(guestCode: string): Promise<boolean> {
        const query = new GetGuestProfileByGuestCodeQuery(guestCode);
        const guestInformation =
            await this.guestProfileQueryService.HandleGetGuestProfileByGuestCode(query);

        return guestInformation ? true : false;
    }

    //administrator profile methods will be here

    public async isAdminExist(administratorId: number): Promise<boolean> {
        console.log(administratorId);
        const query = new GetAdministratorProfileByIdQuery(administratorId);
        const administratorProfile =
            await this.administratorProfileQueryService.HandleGetAdministratorProfileById(
                query,
            );
        if (!administratorProfile) return false;
        return true;
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
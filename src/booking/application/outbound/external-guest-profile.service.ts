import {Inject, Injectable} from "@nestjs/common";
import {RoomContextFacadeService} from "../../../hotel/interfaces/acl/room-context-facade.service";
import {GuestProfile} from "../../../profiles/domain/model/aggregates/Guest-Profile";
import {ProfileContextFacadeService} from "../../../profiles/interfaces/acl/profile-context-facade.service";



@Injectable()
export class ExternalGuestProfileService {
    constructor(
        @Inject()
        private readonly guestContextFacade: ProfileContextFacadeService
    ) {
    }

    public async guestProfileExists(guestProfileId: number): Promise<boolean> {
        return this.guestContextFacade.IsGuestProfileExistById(guestProfileId);
    }

    public async getGuestProfile(guestId: number): Promise<GuestProfile> {
        return await this.guestContextFacade.FetchGuestProfileById(guestId);
    }
    public async addNfcKeyToGuestProfile(guestProfileId: number, nfcKey: string): Promise<void> {
        return this.guestContextFacade.AddNfcKeyToGuestProfile(guestProfileId,nfcKey);
    }


}
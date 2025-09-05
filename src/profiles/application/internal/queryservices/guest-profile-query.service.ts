import {GuestProfile} from "src/profiles/domain/model/aggregates/Guest-Profile";
import {GetGuestProfileByGuestCodeQuery} from "src/profiles/domain/model/queries/get-guest-profile-by-guest-code.query";
import {GetGuestProfileByIdQuery} from "src/profiles/domain/model/queries/get-guest-profile-by-id.query";
import {IGuestProfileQueryService} from "../../../domain/services/i-guest-profile-query-service";
import {Inject, Injectable} from "@nestjs/common";
import {GUEST_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/guest-profile-repository.token";
import {IGuestProfileRepository} from "../../../domain/repositories/i-guest-profile-repository";
import {ExternalIamService} from "../outbound-service/external-iam.service";
import {ProfileNotFoundError} from "../../Errors/profile-not-found.error";
import {DniNotFoundError} from "../../Errors/dni-not-found.error";
import {EStatus} from "../../../domain/model/value-objects/e-status";
import {GuestCodeNotFoundError} from "../../Errors/guest-code-not-found.error";
import {EmailNotFoundError} from "../../Errors/email-not-found.error";


@Injectable()
export class GuestProfileQueryService implements IGuestProfileQueryService {
    constructor(
        @Inject(GUEST_PROFILE_REPOSITORY_TOKEN)
        private readonly guestProfileRepository: IGuestProfileRepository<GuestProfile>,
        @Inject() private readonly externalIamService: ExternalIamService
    ) {}

    public async HandleGetGuestProfileById(query: GetGuestProfileByIdQuery): Promise<{guestProfile: GuestProfile, username: string}> {
        const guestProfile = await this.guestProfileRepository.findByIdAsync(query.id);
        if(!guestProfile) {
            throw new ProfileNotFoundError(query.id);
        }
        const username = await this.externalIamService.obtainUsernameByAccountId(guestProfile.accountId);
        return {guestProfile, username};
    }

    async HandleGetGuestProfileByDni(dni: string): Promise<GuestProfile | null> {
        const guestProfile = await this.guestProfileRepository.findGuestProfileByDni(dni);
        if(!guestProfile) {
            throw new DniNotFoundError(dni);
        }
        return guestProfile;
    }
    async HandleGetAllGuestProfiles(): Promise<GuestProfile[]> {
        return await this.guestProfileRepository.findAllGuestProfiles()
    }
    async HandleGetAllActiveGuestProfiles(): Promise<GuestProfile[]> {
        return await this.guestProfileRepository.findGuestProfileByStatus(EStatus.ACTIVE);
    }
    async HandleGetAllInactiveGuestProfiles(): Promise<GuestProfile[]> {
        return await this.guestProfileRepository.findGuestProfileByStatus(EStatus.INACTIVE);
    }
    async HandleGetGuestProfilesByWord(word: string): Promise<GuestProfile[]> {
        throw new Error("Method not implemented."); //no se si lo vamos a usar
    }
    async  HandleGetGuestProfileByGuestCode(query: GetGuestProfileByGuestCodeQuery): Promise<GuestProfile | null> {
        const guestProfile = await this.guestProfileRepository.findGuestProfileByGuestCode(query.guestCode);
        if(!guestProfile) {
            throw new GuestCodeNotFoundError(query.guestCode);
        }
        return guestProfile;
    }
    async HandleGetGuestProfileByEmail(email: string): Promise<GuestProfile | null> {
        const guestProfile = await this.guestProfileRepository.findGuestProfileByEmail(email);
        if(!guestProfile) {
            throw new EmailNotFoundError(email);
        }
        return guestProfile;
    }

    async HandleGetGuestProfilesByStatus(status: string): Promise<GuestProfile[]> {
        // Convertir string a EStatus
        const statusEnum = status.toUpperCase() as EStatus;
        // Validar que sea un valor válido del enum
        if (!Object.values(EStatus).includes(statusEnum)) {
            throw new Error(`Invalid status: ${status}`);
        }
        return await this.guestProfileRepository.findGuestProfileByStatus(statusEnum);
    }

}
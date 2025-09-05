import {GuestProfileRepository} from "../../../infrastructure/persistence/typeorm/repositories/GuestProfileRepository";
import {Inject, Injectable} from "@nestjs/common";
import {GUEST_PROFILE_REPOSITORY_TOKEN} from "../../../domain/repositories/guest-profile-repository.token";
import {
    ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN
} from "../../../domain/repositories/administrator-profile-repository.token";
import {IGuestProfileQueryService} from "../../../domain/services/i-guest-profile-query-service";
import {IAdministratorProfileQueryService} from "../../../domain/services/i-administrator-profile-query-service";
import { AdministratorProfile } from "src/profiles/domain/model/aggregates/Administrator-profile";
import { GetAdministratorProfileByIdQuery } from "src/profiles/domain/model/queries/get-administrator-profile-by-id.query";

@Injectable()
export class AdministratorProfileQueryService implements IAdministratorProfileQueryService {
    constructor(
        @Inject(ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN)
        private readonly guestProfileRepository: GuestProfileRepository
    ) {
    }

    HandleGetAdministratorProfileById(query: GetAdministratorProfileByIdQuery): Promise<AdministratorProfile> {
        return this.guestProfileRepository.findByIdAsync(query.id);
    }

}
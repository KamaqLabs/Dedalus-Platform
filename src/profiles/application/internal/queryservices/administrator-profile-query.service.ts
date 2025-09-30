import {Inject, Injectable} from "@nestjs/common";
import {
    ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN
} from "../../../domain/repositories/administrator-profile-repository.token";
import {IAdministratorProfileQueryService} from "../../../domain/services/i-administrator-profile-query-service";
import { AdministratorProfile } from "src/profiles/domain/model/aggregates/Administrator-profile";
import { GetAdministratorProfileByIdQuery } from "src/profiles/domain/model/queries/get-administrator-profile-by-id.query";
import {ProfileNotFoundError} from "../../Errors/profile-not-found.error";
import {
    AdministratorProfileRepository
} from "../../../infrastructure/persistence/typeorm/repositories/AdministratorProfileRepository";

@Injectable()
export class AdministratorProfileQueryService implements IAdministratorProfileQueryService {
    constructor(
        @Inject(ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN)
        private readonly administratorRepository: AdministratorProfileRepository,
    ) {
    }

    async HandleGetAdministratorProfileById(query: GetAdministratorProfileByIdQuery): Promise<AdministratorProfile> {
        const administratorProfile = await this.administratorRepository.findByIdAsync(query.id);
        if(!administratorProfile) {
            throw new ProfileNotFoundError(query.id);
        }
        return administratorProfile;
    }

    async HandleGetAdministratorProfileByAccountId(accountId: number): Promise<AdministratorProfile> {
        const administratorProfile = await this.administratorRepository.findProfileByAccountIdAsync(accountId);
        if(!administratorProfile) {
            throw new ProfileNotFoundError(accountId);
        }
        return administratorProfile;
    }

}
import {Inject, Injectable} from "@nestjs/common";
import {IAdministratorProfileCommandService} from "../../../domain/services/i-administrator-profile-command-service";
import {
    ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN
} from "../../../domain/repositories/administrator-profile-repository.token";
import {ExternalIamService} from "../outbound-service/external-iam.service";
import { EventBus } from '@nestjs/cqrs';
import {IAdministratorProfileRepository} from "../../../domain/repositories/i-administrator-profile-repository";
import {AdministratorProfile} from "../../../domain/model/aggregates/Administrator-profile";
import { CreateAdministratorProfileCommand } from "src/profiles/domain/model/commands/create-administrator-profile.command";
import { UpdateAdministratorPersonalInformationCommand } from "src/profiles/domain/model/commands/update-administrator-personal-information.command";

@Injectable()
export class AdministratorProfileCommandService implements IAdministratorProfileCommandService {
    constructor(
        @Inject(ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN)
        private readonly administratorProfileRepository: IAdministratorProfileRepository<AdministratorProfile>,
        @Inject() private readonly externalIamService: ExternalIamService,
        private readonly eventBus: EventBus,
    ) {
    }

    HandleCreateAdministratorProfile(command: CreateAdministratorProfileCommand): Promise<{ administratorProfile: AdministratorProfile; }> {
        throw new Error("Method not implemented.");
    }
    HandleUpdateAdministratorPersonalInformation(command: UpdateAdministratorPersonalInformationCommand): Promise<{ administratorProfile: AdministratorProfile; }> {
        throw new Error("Method not implemented.");
    }




}
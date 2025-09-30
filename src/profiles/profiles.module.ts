import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {GuestProfile} from "./domain/model/aggregates/Guest-Profile";
import {AdministratorProfile} from "./domain/model/aggregates/Administrator-profile";
import {IamModule} from "../iam/iam.module";
import {CqrsModule} from "@nestjs/cqrs";
import {GuestProfileCommandService} from "./application/internal/commandservices/guest-profile-command.service";
import {GUEST_PROFILE_REPOSITORY_TOKEN} from "./domain/repositories/guest-profile-repository.token";
import {ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN} from "./domain/repositories/administrator-profile-repository.token";
import {ExternalIamService} from "./application/internal/outbound-service/external-iam.service";
import {GuestProfileQueryService} from "./application/internal/queryservices/guest-profile-query.service";
import {
    AdministratorProfileQueryService
} from "./application/internal/queryservices/administrator-profile-query.service";
import {ProfileContextFacadeService} from "./interfaces/acl/profile-context-facade.service";
import {GuestProfileRepository} from "./infrastructure/persistence/typeorm/repositories/GuestProfileRepository";
import {
    AdministratorProfileRepository
} from "./infrastructure/persistence/typeorm/repositories/AdministratorProfileRepository";
import {GuestProfileController} from "./interfaces/rest/guest-profile.controller";
import {AdministratorProfileController} from "./interfaces/rest/administrator-profile.controller";
import {
    AdministratorProfileCommandService
} from "./application/internal/commandservices/administrator-Profile-command.service";

@Module({
    imports: [TypeOrmModule.forFeature([GuestProfile, AdministratorProfile]), IamModule, CqrsModule],
    providers: [
        GuestProfileCommandService,
        AdministratorProfileCommandService,
        {
            provide: GUEST_PROFILE_REPOSITORY_TOKEN,
            useClass: GuestProfileRepository,
        },
        {
            provide: ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN,
            useClass: AdministratorProfileRepository,
        },
        ExternalIamService,
        GuestProfileQueryService,
        AdministratorProfileQueryService,
        AdministratorProfileQueryService,
        ProfileContextFacadeService
    ],
    exports: [GUEST_PROFILE_REPOSITORY_TOKEN, ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN, ProfileContextFacadeService],
    controllers: [GuestProfileController,AdministratorProfileController],
})
export class ProfilesModule {}

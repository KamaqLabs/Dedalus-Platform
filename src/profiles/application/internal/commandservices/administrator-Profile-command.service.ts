import {Inject, Injectable} from "@nestjs/common";
import {IAdministratorProfileCommandService} from "../../../domain/services/i-administrator-profile-command-service";
import {
    ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN
} from "../../../domain/repositories/administrator-profile-repository.token";
import {ExternalIamService} from "../outbound-service/external-iam.service";
import {EventBus} from '@nestjs/cqrs';
import {IAdministratorProfileRepository} from "../../../domain/repositories/i-administrator-profile-repository";
import {AdministratorProfile} from "../../../domain/model/aggregates/Administrator-profile";
import {
    CreateAdministratorProfileCommand
} from "src/profiles/domain/model/commands/create-administrator-profile.command";
import {
    UpdateAdministratorPersonalInformationCommand
} from "src/profiles/domain/model/commands/update-administrator-personal-information.command";
import {DniExistsError} from "../../Errors/dni-exists.error";
import {EmailExistsError} from "../../Errors/email-exists.error";
import {ProfileNotFoundError} from "../../Errors/profile-not-found.error";

@Injectable()
export class AdministratorProfileCommandService implements IAdministratorProfileCommandService {
    constructor(
        @Inject(ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN)
        private readonly administratorProfileRepository: IAdministratorProfileRepository<AdministratorProfile>,
        @Inject() private readonly externalIamService: ExternalIamService,
        private readonly eventBus: EventBus,
    ) {
    }
    async HandleCreateAdministratorProfile(command: CreateAdministratorProfileCommand, hotelId: number): Promise<AdministratorProfile> {
        let accountId =0;
        try{
            const profileFoundByDni = await this.administratorProfileRepository.findAdministratorByDniAsync(command.dni);
            if(profileFoundByDni) throw new DniExistsError();
            const profileFoundByEmail = await this.administratorProfileRepository.findAdministratorProfileByEmailAsync(command.email);
            if(profileFoundByEmail) throw new EmailExistsError();

            accountId = await this.externalIamService.createAccount(command.username,command.password,"ADMIN");

            const administratorProfile = AdministratorProfile.ConstructAdministratorProfileFromCommand(command,hotelId);
            administratorProfile.setAccountId(accountId);

            return await this.administratorProfileRepository.addAsync(administratorProfile);
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
    async HandleUpdateAdministratorPersonalInformation(command: UpdateAdministratorPersonalInformationCommand, administratorId:number): Promise<AdministratorProfile> {
        const administratorProfile = await this.administratorProfileRepository.findByIdAsync(administratorId);

        const profileFoundByDni = await this.administratorProfileRepository.findAdministratorByDniAsync(command.dni);
        if(profileFoundByDni) throw new DniExistsError();
        const profileFoundByEmail = await this.administratorProfileRepository.findAdministratorProfileByEmailAsync(command.email);
        if(profileFoundByEmail) throw new EmailExistsError();


        if(!administratorProfile) throw new ProfileNotFoundError(administratorId);
        administratorProfile.UpdatePersonalInformation(command);
        return await this.administratorProfileRepository.updateAsync(administratorProfile);
    }
}
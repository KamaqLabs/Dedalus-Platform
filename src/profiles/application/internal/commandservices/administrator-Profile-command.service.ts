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
import {
    GenerateAdministratorRegisterInvitationCommand
} from "../../../domain/model/commands/generate-administrator-register-invitation.command";
import {InvitationGeneratedEvent} from "../../../domain/model/events/invitation-generated.event";
import { v4 as uuidv4 } from 'uuid';

import {GetUsedInvitationByTokenIdQuery} from "../../../domain/model/queries/get-used-invitation-by-token-id.query";
import {InvitationQueryService} from "../queryservices/invitation-query.service";
import {InvalidInvitationTokenError} from "../../Errors/invalid-invitation-token.error";
import {InvitationCommandService} from "./invitation-command.service";
import {
    CreateAdministratorProfileFromInvitationCommand
} from "../../../domain/model/commands/create-administrator-profile-from-invitation.command";

@Injectable()
export class AdministratorProfileCommandService implements IAdministratorProfileCommandService {
    constructor(
        @Inject(ADMINISTRATOR_PROFILE_REPOSITORY_TOKEN)
        private readonly administratorProfileRepository: IAdministratorProfileRepository<AdministratorProfile>,
        @Inject() private readonly externalIamService: ExternalIamService,
        private readonly eventBus: EventBus,
        private readonly invitationQueryService: InvitationQueryService,
        private readonly invitationCommandService: InvitationCommandService,
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

    public async HandleGenerateAdministratorRegisterInvitation(command: GenerateAdministratorRegisterInvitationCommand):Promise<string> {
        const emptyAdministratorProfile = new AdministratorProfile();
        const jti = uuidv4();
        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // expires in 24 hours
        await this.eventBus.publishAll([new InvitationGeneratedEvent(jti, expirationDate)])
        return await this.externalIamService.obtainInvitationUrl(command.email,jti);
    }



    async handleCreateAdministratorProfileFromInvitation(command: CreateAdministratorProfileFromInvitationCommand, hotelId:number): Promise<{
        administratorProfile: AdministratorProfile;
        username: string
    }> {
        const getUsedInvitationQuery = new GetUsedInvitationByTokenIdQuery(command.invitationToken)

        const isTokenInvitationUsed = await this.invitationQueryService.getUsedInvitationByTokenId(getUsedInvitationQuery)
        const isTokenInvitationValid = await this.externalIamService.validateTokenInvitation(command.invitationToken)

        if(!isTokenInvitationValid) throw new InvalidInvitationTokenError();
        if(isTokenInvitationUsed) throw new InvalidInvitationTokenError();

        const { email, jti } = await this.externalIamService.obtainInformationFromTokenInvitation(command.invitationToken);


        let accountId: number;
        let persistedAdministratorProfile: AdministratorProfile;

        try {
            const profileFoundByDni = await this.administratorProfileRepository.findAdministratorByDniAsync(command.dni);
            if(profileFoundByDni) throw new DniExistsError();

            const profileFoundByEmail = await this.administratorProfileRepository.findAdministratorProfileByEmailAsync(email);
            if(profileFoundByEmail) throw new EmailExistsError();


            const commandWithEmail = {
                ...command,
                email,
            }

            accountId = await this.externalIamService.createAccount(command.username, command.password, "ADMIN");

            const administratorProfile = AdministratorProfile.ConstructAdministratorProfileFromCommand(commandWithEmail, hotelId);
            administratorProfile.setAccountId(accountId);

            await this.invitationCommandService.markAsUsed(jti);

            persistedAdministratorProfile =  await this.administratorProfileRepository.addAsync(administratorProfile);

            return {
                administratorProfile: persistedAdministratorProfile,
                username: command.username
            }
        } catch (error) {

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




}
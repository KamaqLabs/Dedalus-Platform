import { CreateAdministratorProfileCommand } from '../model/commands/create-administrator-profile.command';
import { UpdateAdministratorPersonalInformationCommand } from '../model/commands/update-administrator-personal-information.command';
import {AdministratorProfile} from "../model/aggregates/Administrator-profile";

export interface IAdministratorProfileCommandService {
    HandleCreateAdministratorProfile(command: CreateAdministratorProfileCommand): Promise<{administratorProfile: AdministratorProfile}>;
    HandleUpdateAdministratorPersonalInformation(command: UpdateAdministratorPersonalInformationCommand): Promise<{administratorProfile: AdministratorProfile}>;

}


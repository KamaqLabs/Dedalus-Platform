import {Profile} from "./profile";
import {Column, Entity, BeforeInsert} from "typeorm";
import { CreateAdministratorProfileCommand } from '../commands/create-administrator-profile.command';
import { UpdateAdministratorPersonalInformationCommand } from '../commands/update-administrator-personal-information.command';

@Entity()
export class AdministratorProfile extends Profile{

    @Column()
    public hotelId: number;

    constructor() {
        super();
    }

    static ConstructAdministratorProfileFromCommand(command: CreateAdministratorProfileCommand): AdministratorProfile {
        const adminProfile = new AdministratorProfile();
        adminProfile.hotelId = command.hotelId;
        Object.assign(adminProfile, Profile.create.call(this,
            null,
            command.name,
            command.lastName,
            command.dni,
            command.email,
            command.phoneNumber
        ));
        return adminProfile;
    }

    static ConstructAdministratorProfileFromUpdateCommand(command: UpdateAdministratorPersonalInformationCommand): AdministratorProfile {
        const adminProfile = new AdministratorProfile();
        Object.assign(adminProfile, Profile.create.call(this,
            null,
            command.name,
            command.lastName,
            command.dni,
            command.email,
            command.phoneNumber
        ));
        return adminProfile;
    }

}
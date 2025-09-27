import {Profile} from "./profile";
import {Column, Entity, BeforeInsert, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { CreateAdministratorProfileCommand } from '../commands/create-administrator-profile.command';
import { UpdateAdministratorPersonalInformationCommand } from '../commands/update-administrator-personal-information.command';

@Entity()
export class AdministratorProfile extends Profile{

    @Column({ name: 'hotel_id', nullable: false })
    hotelId: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    constructor() {
        super();
    }


    static ConstructAdministratorProfileFromCommand(command: CreateAdministratorProfileCommand, hotelId:number): AdministratorProfile {
        const adminProfile = new AdministratorProfile();
        adminProfile.hotelId = hotelId;
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

    public UpdatePersonalInformation(command: UpdateAdministratorPersonalInformationCommand): void {
        this.name = command.name;
        this.lastName = command.lastName;
        this.dni = command.dni;
        this.email = command.email;
        this.phoneNumber = command.phoneNumber;
    }

    public setAccountId(accountId: number): void {
        this.accountId = accountId;
    }

}
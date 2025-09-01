import {Profile} from "./profile";
import {BeforeInsert, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {EStatus} from "../value-objects/e-status";
import { Entity } from "typeorm";
import {CreateGuestProfileCommand} from "../commands/create-guest-profile.command";

@Entity()
export class GuestProfile extends Profile{

    @Column({ type: 'enum', enum: EStatus, default: EStatus.INACTIVE })
    public status: EStatus;

    @Column({ name: 'nfc_key' })
    public nfcKey: string;

    @Column({ unique: true })
    guestCode: string;

    @BeforeInsert()
    generateGuestCode() {
        // Generate an 9-digit random number as a string
        this.guestCode = Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000).toString();
    }

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    constructor() {
        super();
    }

    static ConstructGuestProfileFromCommand(command: CreateGuestProfileCommand): GuestProfile {
        const guestProfile = new GuestProfile();
        guestProfile.accountId = null;

        Object.assign(guestProfile, Profile.create.call(this,
            guestProfile.accountId,
            command.name,
            command.lastName,
            command.dni,
            command.email,
            command.phoneNumber
        ));
        guestProfile.status = EStatus.INACTIVE;
        guestProfile.nfcKey = null;

        return guestProfile;
    }

    public AssignNfcKey(nfcKey: string) {
        this.nfcKey = nfcKey;
    }

    public setAccountId(accountId: number): void {
        this.accountId = accountId;
    }
    public ActiveGuestProfile(): void {
        this.status = EStatus.ACTIVE;
    }

    public DeactivateGuestProfile(): void {
        this.status = EStatus.INACTIVE;
    }



}
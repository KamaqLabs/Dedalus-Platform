import {Column, PrimaryGeneratedColumn} from "typeorm";


export abstract class Profile {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'account_id' })
    public accountId: number;

    @Column()
    public name: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column()
    public dni: string;

    @Column()
    public email: string;

    @Column({ name: 'phone_number' })
    public phoneNumber: string;

    static create<T extends Profile>(
        this: new () => T,
        accountId: number,
        name: string,
        lastName: string,
        dni: string,
        email: string): T {
        const profile = new this();
        profile.accountId = accountId;
        profile.name = name;
        profile.lastName = lastName;
        profile.dni = dni;
        profile.email = email;

        return profile;
    }
}
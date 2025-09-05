import { EStatus } from '../../../domain/model/value-objects/e-status';

export class GuestProfileResourceDto {
    id: number;
    accountId: number;
    name: string;
    lastName: string;
    dni: string;
    email: string;
    phoneNumber: string;
    status: EStatus;
    nfcKey: string;
    guestCode: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;

    constructor(data: {
        id: number;
        accountId: number;
        name: string;
        lastName: string;
        dni: string;
        email: string;
        phoneNumber: string;
        status: EStatus;
        nfcKey: string;
        guestCode: string;
        createdAt: Date;
        updatedAt: Date;
        username: string;
    }) {
        this.id = data.id;
        this.accountId = data.accountId;
        this.name = data.name;
        this.lastName = data.lastName;
        this.dni = data.dni;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.status = data.status;
        this.nfcKey = data.nfcKey;
        this.guestCode = data.guestCode;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.username = data.username;
    }
}
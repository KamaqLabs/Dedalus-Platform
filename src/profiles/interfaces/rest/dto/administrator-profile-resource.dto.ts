import {AdministratorProfile} from "../../../domain/model/aggregates/Administrator-profile";

export class AdministratorProfileResourceDto {
    id: number;
    accountId: number;
    hotelId:number;
    name: string;
    lastName: string;
    dni: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;
    username: string;

    constructor(data: AdministratorProfile) {
        this.id = data.id;
        this.accountId = data.accountId;
        this.hotelId = data.hotelId;
        this.name = data.name;
        this.lastName = data.lastName;
        this.dni = data.dni;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.username = data.accountId ? `user${data.accountId}` : '';
    }
}
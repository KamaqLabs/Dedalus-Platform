export class AdministratorProfileFromInvitationResourceDto{
    id: number;
    accountId: number;
    hotelId:number;
    name: string;
    lastName: string;
    username: string;
    dni: string;
    email: string;
    phoneNumber: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: {
        id: number;
        accountId: number;
        hotelId:number;
        name: string;
        lastName: string;
        username: string;
        dni: string;
        email: string;
        phoneNumber: string;
        createdAt: Date;
        updatedAt: Date;
    })
    {
        this.id = data.id;
        this.accountId = data.accountId;
        this.hotelId = data.hotelId;
        this.name = data.name;
        this.lastName = data.lastName;
        this.username = data.username;
        this.dni = data.dni;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

}
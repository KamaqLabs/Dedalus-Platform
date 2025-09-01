export class UpdateGuestPersonalInformationCommand {
    public readonly guestId!: number;
    public readonly name: string;
    public readonly lastName: string;
    public readonly dni: string;
    public readonly email: string;
    public readonly phoneNumber: string;

    constructor(data: {
        guestId: number;
        name: string;
        lastName: string;
        dni: string;
        email: string;
        phoneNumber: string;
    }) {
        this.guestId = data.guestId;
        this.name = data.name;
        this.lastName = data.lastName;
        this.dni = data.dni;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
    }
}


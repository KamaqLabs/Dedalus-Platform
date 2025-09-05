export class CreateAdministratorProfileCommand {
    public readonly name: string;
    public readonly lastName: string;
    public readonly dni: string;
    public readonly email: string;
    public readonly phoneNumber: string;

    constructor(data: {
        name: string;
        lastName: string;
        dni: string;
        email: string;
        phoneNumber: string;
    }) {
        this.name = data.name;
        this.lastName = data.lastName;
        this.dni = data.dni;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
    }
}


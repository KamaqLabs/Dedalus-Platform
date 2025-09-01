export class CreateGuestProfileCommand{
    public readonly username: string;
    public readonly password: string;
    public readonly name: string;
    public readonly lastName: string;
    public readonly dni: string;
    public readonly email: string;
    public readonly phoneNumber: string;

    constructor(data: {
        username: string;
        password: string;
        name: string;
        lastName: string;
        dni: string;
        email: string;
        phoneNumber: string;
    }) {
        this.username = data.username;
        this.password = data.password;
        this.name = data.name;
        this.lastName = data.lastName;
        this.dni = data.dni;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
    }
}
export class GenerateAdministratorRegisterInvitationCommand{
    public readonly email: string;

    constructor(email: string) {
        this.email = email;
    }
}
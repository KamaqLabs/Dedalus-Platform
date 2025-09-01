export class DeleteGuestProfileCommand {
    public readonly guestProfileId: number;

    constructor(guestProfileId: number) {
        this.guestProfileId = guestProfileId;
    }
}


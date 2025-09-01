export class DestroyGuestNfcKeyCommand {
    public readonly guestProfileId: number;

    constructor(guestProfileId: number) {
        this.guestProfileId = guestProfileId;
    }
}


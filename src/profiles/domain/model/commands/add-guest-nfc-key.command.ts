export class AddGuestNfcKeyCommand {
    public readonly guestProfileId: number;
    public readonly nfcKey: string;

    constructor(data: { guestProfileId: number; nfcKey: string }) {
        this.guestProfileId = data.guestProfileId;
        this.nfcKey = data.nfcKey;
    }
}


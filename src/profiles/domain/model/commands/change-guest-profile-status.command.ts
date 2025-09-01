export class ChangeGuestProfileStatusCommand {
    public readonly guestProfileId: number;
    public readonly status: string;

    constructor(data: { guestProfileId: number; status: string }) {
        this.guestProfileId = data.guestProfileId;
        this.status = data.status;
    }
}


export class CreateBookByGuestCodeCommand {
    public readonly guestCode: string;
    public readonly roomId: number;
    public readonly checkInDate: Date;
    public readonly checkOutDate: Date;
    constructor(data: {
        guestCode: string;
        roomId: number;
        checkInDate: Date;
        checkOutDate: Date;
    }) {
        this.guestCode = data.guestCode;
        this.roomId = data.roomId;
        this.checkInDate = data.checkInDate;
        this.checkOutDate = data.checkOutDate;
    }

}
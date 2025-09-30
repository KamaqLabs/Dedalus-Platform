export class CreateBookCommand {
    public readonly guestId: number;
    public readonly roomId: number;
    public readonly checkInDate: Date;
    public readonly checkOutDate: Date;
    constructor(data: {
        guestId: number;
        roomId: number;
        checkInDate: Date;
        checkOutDate: Date;
    }) {
        this.guestId = data.guestId;
        this.roomId = data.roomId;
        this.checkInDate = data.checkInDate;
        this.checkOutDate = data.checkOutDate;
    }

}
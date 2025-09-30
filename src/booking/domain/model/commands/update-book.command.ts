export class UpdateBookCommand {
    public readonly checkInDate?: Date;
    public readonly roomId?: number;
    public readonly checkOutDate?: Date;
    public readonly totalPrice?: number;

    constructor(data: {

        checkInDate?: Date;
        checkOutDate?: Date;
        roomId?: number;
        totalPrice?: number;
    }) {

        this.checkInDate = data.checkInDate;
        this.checkOutDate = data.checkOutDate;
        this.roomId = data.roomId;
        this.totalPrice = data.totalPrice;
    }
}


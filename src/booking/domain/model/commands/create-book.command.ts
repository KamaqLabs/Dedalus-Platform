export class CreateBookCommand {
    public readonly guestId: number;
    public readonly hotelId: number;
    public readonly checkInDate: Date;
    public readonly checkOutDate: Date;
    public readonly totalPrice: number;
    public readonly nfcKey?: string | null;

    constructor(data: {
        guestId: number;
        hotelId: number;
        checkInDate: Date;
        checkOutDate: Date;
        totalPrice: number;
        nfcKey?: string | null;
    }) {
        this.guestId = data.guestId;
        this.hotelId = data.hotelId;
        this.checkInDate = data.checkInDate;
        this.checkOutDate = data.checkOutDate;
        this.totalPrice = data.totalPrice;
        this.nfcKey = data.nfcKey ?? null;
    }

}
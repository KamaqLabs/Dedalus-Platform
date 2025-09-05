export class RescheduleBookCommand {
    public readonly newCheckInDate: Date;
    public readonly newCheckOutDate: Date;

    constructor(data: {
        newCheckInDate: Date;
        newCheckOutDate: Date;
    }) {
        this.newCheckInDate = data.newCheckInDate;
        this.newCheckOutDate = data.newCheckOutDate;
    }
}


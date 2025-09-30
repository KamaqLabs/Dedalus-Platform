export class BookingCheckedInEvent {
    constructor(
        public readonly bookingId: number,
        public readonly roomId: number,
        public readonly checkInDate: Date
    ) {}
}
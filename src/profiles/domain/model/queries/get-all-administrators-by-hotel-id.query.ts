export class GetAllAdministratorsByHotelIdQuery {
    public readonly hotelId: number;

    constructor(hotelId: number) {
        this.hotelId = hotelId;
    }
}


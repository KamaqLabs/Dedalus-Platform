import {Booking} from "../model/aggregates/Booking";
import {BookStatus} from "../model/valueObjects/BookStatus";

export interface IBookingQueryService {
    findBookingByIdAsync(bookingId: number): Promise<Booking>;
    findAllBookingsByHotelIdAsync(hotelId: number): Promise<Booking[]>;
    findBookingsByGuestIdAsync(guestId: number): Promise<Booking[]>;
    findBookingsByStatusAsync(status: BookStatus): Promise<Booking[]>;
    findBookingsByDateRangeAsync(startDate: Date, endDate: Date): Promise<Booking[]>;
    findAllBookingsAsync(): Promise<Booking[]>;

}

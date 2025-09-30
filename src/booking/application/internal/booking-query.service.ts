import {Inject, Injectable} from "@nestjs/common";
import {IBookingQueryService} from "../../domain/services/i-booking-query-service";
import { Booking } from "src/booking/domain/model/aggregates/Booking";
import { BookStatus } from "src/booking/domain/model/valueObjects/BookStatus";
import {BOOKING_REPOSITORY_TOKEN} from "../../domain/repositories/booking-repository.token";
import {IBookingRepository} from "../../domain/repositories/i-booking-repository";


@Injectable()
export class BookingQueryService implements IBookingQueryService {
    constructor(
        @Inject(BOOKING_REPOSITORY_TOKEN)
        private readonly bookingRepository: IBookingRepository<Booking>,
    ) {
    }

    findBookingByIdAsync(bookingId: number): Promise<Booking> {
        return this.bookingRepository.findByIdAsync(bookingId);
    }
    findAllBookingsByHotelIdAsync(hotelId: number): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }
    findBookingsByGuestIdAsync(guestId: number): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }
    findBookingsByStatusAsync(status: BookStatus): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }
    findBookingsByDateRangeAsync(startDate: Date, endDate: Date): Promise<Booking[]> {
        throw new Error("Method not implemented.");
    }

}
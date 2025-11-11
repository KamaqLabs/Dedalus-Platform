import {Booking} from "../model/aggregates/Booking";
import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";
import {BookStatus} from "../model/valueObjects/BookStatus";



export interface IBookingRepository<AdministratorProfile> extends IBaseRepository<Booking> {

    findBooksByCheckInDate(checkInDate: Date): Promise<Booking[]>;
    findBooksByStatus(status: BookStatus): Promise<Booking[]>;
    findBooksByGuestId(guestId: number): Promise<Booking[]>;
    findBooksByHotelId(hotelId: number): Promise<Booking[]>;
    findBookByRoomId(roomId: number): Promise<Booking>;

    isRoomAvailable(roomId: number, checkInDate: Date, checkOutDate: Date): Promise<boolean>;
    findConflictingBookings(roomId: number, checkInDate: Date, checkOutDate: Date): Promise<Booking[]>;
    findAvailableRoomsByDateRange(hotelId: number, checkInDate: Date, checkOutDate: Date): Promise<number[]>;

    findBookingsReadyForReminder(tomorrow: Date, dayAfterTomorrow: Date): Promise<Booking[]>;
    findBookingsForStatusUpdate(): Promise<{
        readyForCheckIn: Booking[],
        pendingConfirmation: Booking[],
        readyForCheckOut: Booking[]
    }>;

    updateBookingsToCheckedIn(bookingIds: number[]): Promise<void>

    updateBookingsToConfirmed(bookingIds: number[]): Promise<void>

    updateBookingsToCheckedInWithRoomStatus(bookingIds: number[]): Promise<void>


    updateBookingsToCheckedOutWithRoomStatus(checkOutIds: number[]): any;
}
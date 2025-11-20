import {CreateBookCommand} from "../model/commands/create-book.command";
import {Booking} from "../model/aggregates/Booking";
import {GuestProfile} from "../../../profiles/domain/model/aggregates/Guest-Profile";
import {RescheduleBookCommand} from "../model/commands/reschedule-book.command";
import {UpdateBookCommand} from "../model/commands/update-book.command";
import {BookInformationResourceDto} from "../../interfaces/rest/dto/book-information-resource.dto";
import {CreateBookByGuestCodeCommand} from "../model/commands/create-book-by-guest-code.command";


export interface IBookingCommandService {
    HandleCreateBookingAsync(command: CreateBookCommand, hotelId: number): Promise<BookInformationResourceDto>;
    HandleCreateBookingByGuestCodeAsync(command: CreateBookByGuestCodeCommand, hotelId: number): Promise<BookInformationResourceDto>;
    HandleUpdateBookingAsync(bookingId: number, command: UpdateBookCommand): Promise<Booking>;
    HandleDeleteBookingAsync(bookingId: number): Promise<void>;
    HandleRescheduleBookingAsync(bookingId: number, command: RescheduleBookCommand): Promise<Booking>;

    HandleAddPriceToBookingAsync(bookingId: number, additionalPrice: number): Promise<Booking>;
    HandleCheckInBookingAsync(bookingId: number): Promise<void>;
    HandleCheckOutBookingAsync(bookingId: number): Promise<void>;
    HandleCancelBookingAsync(bookingId: number): Promise<Booking>;
    HandleConfirmBookingAsync(bookingId: number): Promise<void>;

    HandleRejectBookingAsync(bookingId: number, reason?: string): Promise<Booking>;
    HandleEarlyCheckInAsync(bookingId: number, newCheckInDate: Date): Promise<Booking>;
    HandleApplyDiscountAsync(bookingId: number, discountPercentage: number): Promise<Booking>;
    HandleRefundBookingAsync(bookingId: number, refundAmount?: number): Promise<Booking>;
}
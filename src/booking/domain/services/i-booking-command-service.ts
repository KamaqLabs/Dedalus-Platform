import {CreateBookCommand} from "../model/commands/create-book.command";
import {Booking} from "../model/aggregates/Booking";
import {GuestProfile} from "../../../profiles/domain/model/aggregates/Guest-Profile";
import {RescheduleBookCommand} from "../model/commands/reschedule-book.command";
import {UpdateBookCommand} from "../model/commands/update-book.command";

export interface IBookingCommandService {
    HandleCreateBookingAsync(command: CreateBookCommand, hotelId: number): Promise<{bookingInformation: Booking, guestInformation: GuestProfile}>;
    HandleUpdateBookingAsync(bookingId: number, command: UpdateBookCommand): Promise<Booking>;
    HandleDeleteBookingAsync(bookingId: number): Promise<void>;
    HandleAssignNfcKeyToBookingAsync(bookingId: number, nfcKey: string): Promise<Booking>;
    HandleRemoveNfcKeyFromBookingAsync(bookingId: number): Promise<Booking>;
    HandleRescheduleBookingAsync(bookingId: number, command: RescheduleBookCommand): Promise<Booking>;
    HandleAddPriceToBookingAsync(bookingId: number, additionalPrice: number): Promise<Booking>;
    HandleCheckInBookingAsync(bookingId: number): Promise<Booking>;
    HandleCheckOutBookingAsync(bookingId: number): Promise<Booking>;
    HandleCancelBookingAsync(bookingId: number): Promise<Booking>;
    HandleCompleteBookingAsync(bookingId: number): Promise<Booking>;
    HandleConfirmBookingAsync(bookingId: number): Promise<Booking>;
    HandleRejectBookingAsync(bookingId: number, reason?: string): Promise<Booking>;
    HandleExtendCheckoutAsync(bookingId: number, newCheckOutDate: Date): Promise<Booking>;
    HandleEarlyCheckInAsync(bookingId: number, newCheckInDate: Date): Promise<Booking>;
    HandleTransferBookingAsync(bookingId: number, newGuestId: number): Promise<Booking>;
    HandleDuplicateBookingAsync(bookingId: number, newDates: { checkIn: Date, checkOut: Date }): Promise<Booking>;
    HandleApplyDiscountAsync(bookingId: number, discountPercentage: number): Promise<Booking>;
    HandleRefundBookingAsync(bookingId: number, refundAmount?: number): Promise<Booking>;
    HandleUpgradeBookingAsync(bookingId: number, upgradePrice: number): Promise<Booking>;
}
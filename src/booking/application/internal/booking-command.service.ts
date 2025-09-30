import {Inject, Injectable} from "@nestjs/common";
import {BOOKING_REPOSITORY_TOKEN} from "../../domain/repositories/booking-repository.token";
import {Booking} from "../../domain/model/aggregates/Booking";
import {IBookingRepository} from "../../domain/repositories/i-booking-repository";
import {ExternalHotelService} from "../outbound/external-hotel.service";
import {ExternalRoomService} from "../outbound/external-room.service";
import {IBookingCommandService} from "../../domain/services/i-booking-command-service";
import { CreateBookCommand } from "src/booking/domain/model/commands/create-book.command";
import { RescheduleBookCommand } from "src/booking/domain/model/commands/reschedule-book.command";
import { UpdateBookCommand } from "src/booking/domain/model/commands/update-book.command";
import {NfcTokenGenerator} from "./utils/NfcTokenGenerator";
import {ExternalGuestProfileService} from "../outbound/external-guest-profile.service";
import {BookInformationResourceDto} from "../../interfaces/rest/dto/book-information-resource.dto";
import {ToPeruvianTimeZoneService} from "./utils/to-peruvian-time-zone.service";

@Injectable()
export class BookingCommandService implements IBookingCommandService {
    constructor(
        @Inject(BOOKING_REPOSITORY_TOKEN)
        private readonly bookingRepository: IBookingRepository<Booking>,
        @Inject() private readonly externalHotelService: ExternalHotelService,
        @Inject() private readonly externalRoomService: ExternalRoomService,
        @Inject() private readonly externalGuestProfileService: ExternalGuestProfileService,
        @Inject() private readonly peruTimeService: ToPeruvianTimeZoneService,

    ) {
    }

    private calculateNights(checkIn: Date, checkOut: Date): number {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const diffTime = checkOut.getTime() - checkIn.getTime();
        return Math.round(diffTime / millisecondsPerDay);
    }


    async HandleCreateBookingAsync(command: CreateBookCommand, hotelId: number): Promise<BookInformationResourceDto> {
        if(!(await this.externalHotelService.hotelExists(hotelId))){
            throw new Error(`Hotel with ID ${hotelId} does not exist.`);
        }
        if(!(await this.externalRoomService.roomExists(command.roomId))){
            throw new Error(`Room with ID ${command.roomId} does not exist.`);
        }
        if(await this.bookingRepository.isRoomAvailable(command.roomId,command.checkInDate,command.checkOutDate) == false ){
            throw new Error(`Room with ID ${command.roomId} is not available for the selected dates.`);
        }
        if(!(await this.externalGuestProfileService.guestProfileExists(command.guestId))){
            throw new Error(`Guest with ID ${command.guestId} does not exist.`);
        }
        const now = this.peruTimeService.getCurrentPeruvianTime();
        const minutesUntilCheckIn = this.peruTimeService.getMinutesDifference(command.checkInDate, now);
        let booking: Booking;
        if(minutesUntilCheckIn <= 30 ){
            booking = Booking.ConstructInstantBookingFromCommand(command,hotelId);
        }
        else{
             booking = Booking.ConstructBookingFromCommand(command,hotelId);
        }
        const nights = this.calculateNights(command.checkInDate, command.checkOutDate);
        booking.totalPrice = await this.externalRoomService.getPricePerNight(command.roomId) * nights;
        const createdBooking = await this.bookingRepository.addAsync(booking);
        const nfcKey = NfcTokenGenerator.generateNfcToken()
        await this.externalRoomService.reserveRoom(command.roomId,nfcKey)
        await this.externalGuestProfileService.addNfcKeyToGuestProfile(command.guestId,nfcKey)
        const guestInformation = await this.externalGuestProfileService.getGuestProfile(command.guestId);
        guestInformation.AssignNfcKey(nfcKey);
        return BookInformationResourceDto.fromBookingAndGuest(createdBooking, guestInformation);
    }
    HandleUpdateBookingAsync(bookingId: number, command: UpdateBookCommand): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleDeleteBookingAsync(bookingId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    HandleRescheduleBookingAsync(bookingId: number, command: RescheduleBookCommand): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleAddPriceToBookingAsync(bookingId: number, additionalPrice: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleCheckInBookingAsync(bookingId: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleCheckOutBookingAsync(bookingId: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleCancelBookingAsync(bookingId: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleConfirmBookingAsync(bookingId: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleRejectBookingAsync(bookingId: number, reason?: string): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleEarlyCheckInAsync(bookingId: number, newCheckInDate: Date): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleApplyDiscountAsync(bookingId: number, discountPercentage: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }
    HandleRefundBookingAsync(bookingId: number, refundAmount?: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }


}
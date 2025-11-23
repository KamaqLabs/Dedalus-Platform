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
import { CreateBookByGuestCodeCommand } from "src/booking/domain/model/commands/create-book-by-guest-code.command";
import {GuestProfile} from "../../../profiles/domain/model/aggregates/Guest-Profile";
import {BookStatus} from "../../domain/model/valueObjects/BookStatus";

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

    private async createAndAssignBooking(
        booking: Booking,
        roomId: number,
        guestId: number
    ): Promise<BookInformationResourceDto> {
        const nights = this.calculateNights(booking.checkInDate, booking.checkOutDate);
        booking.totalPrice = await this.externalRoomService.getPricePerNight(roomId) * nights;
        const createdBooking = await this.bookingRepository.addAsync(booking);
        await this.externalRoomService.reserveRoom(roomId);
        const guestInformation: GuestProfile = await this.externalGuestProfileService.getGuestProfile(guestId);

        if(createdBooking.bookStatus === BookStatus.CHECKED_IN){
            await this.HandleCheckInBookingAsync(createdBooking.id);
        }

        return BookInformationResourceDto.fromBookingAndGuest(createdBooking, guestInformation);
    }

    async HandleCreateBookingByGuestCodeAsync(command: CreateBookByGuestCodeCommand, hotelId: number): Promise<BookInformationResourceDto> {

        if(!(await this.externalHotelService.hotelExists(hotelId))){
            throw new Error(`Hotel with ID ${hotelId} does not exist.`);
        }
        if(!(await this.externalRoomService.roomExists(command.roomId))){
            throw new Error(`Room with ID ${command.roomId} does not exist.`);
        }
        if(await this.bookingRepository.isRoomAvailable(command.roomId,command.checkInDate,command.checkOutDate) == false ){
            throw new Error(`Room with ID ${command.roomId} is not available for the selected dates.`);
        }
        if(!(await this.externalGuestProfileService.guestProfileExistsByGuestCode(command.guestCode))){
            throw new Error(`Guest with ID ${command.guestCode} does not exist.`);
        }
        const guestProfile: GuestProfile = await this.externalGuestProfileService.getGuestProfileByGuestCode(command.guestCode);

        const now = this.peruTimeService.getCurrentPeruvianTime();
        const minutesUntilCheckIn = this.peruTimeService.getMinutesDifference(command.checkInDate, now);
        let booking: Booking;

        if(minutesUntilCheckIn <= 5){
            booking = Booking.ConstructBookingFromGuestCode(command,hotelId, guestProfile.id, BookStatus.CHECKED_IN);
        }
        else if(minutesUntilCheckIn <= 1440 ){
            booking = Booking.ConstructBookingFromGuestCode(command,hotelId, guestProfile.id, BookStatus.CONFIRMED);
        }
        else{
            booking = Booking.ConstructBookingFromGuestCode(command,hotelId, guestProfile.id, BookStatus.PENDING);
        }

    /*    const nights = this.calculateNights(command.checkInDate, command.checkOutDate);
        booking.totalPrice = await this.externalRoomService.getPricePerNight(command.roomId) * nights;
        const createdBooking = await this.bookingRepository.addAsync(booking);
        const nfcKey = NfcTokenGenerator.generateNfcToken()
        await this.externalRoomService.reserveRoom(command.roomId,nfcKey)
        await this.externalGuestProfileService.addNfcKeyToGuestProfile(guestProfile.id,nfcKey)
        const guestInformation = await this.externalGuestProfileService.getGuestProfile(guestProfile.id);
        guestInformation.AssignNfcKey(nfcKey);
        return BookInformationResourceDto.fromBookingAndGuest(createdBooking, guestInformation);*/
        return await this.createAndAssignBooking(booking, command.roomId, guestProfile.id);
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

        if(minutesUntilCheckIn <= 5){
            booking = Booking.ConstructAutomatedBookingFromCommand(command,hotelId);
        }
        else if(minutesUntilCheckIn <= 1440 ){
            booking = Booking.ConstructInstantBookingFromCommand(command,hotelId);
        }
        else{
             booking = Booking.ConstructBookingFromCommand(command,hotelId);
        }

        /*const nights = this.calculateNights(command.checkInDate, command.checkOutDate);
        booking.totalPrice = await this.externalRoomService.getPricePerNight(command.roomId) * nights;
        const createdBooking = await this.bookingRepository.addAsync(booking);
        const nfcKey = NfcTokenGenerator.generateNfcToken()
        await this.externalRoomService.reserveRoom(command.roomId,nfcKey)
        await this.externalGuestProfileService.addNfcKeyToGuestProfile(command.guestId,nfcKey)
        const guestInformation = await this.externalGuestProfileService.getGuestProfile(command.guestId);
        guestInformation.AssignNfcKey(nfcKey);
        return BookInformationResourceDto.fromBookingAndGuest(createdBooking, guestInformation);*/

        return await this.createAndAssignBooking(booking, command.roomId, command.guestId);
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



    async HandleConfirmBookingAsync(bookingId: number): Promise<void> {
        const toConfirmBooking: Booking = await this.bookingRepository.findByIdAsync(bookingId);
        try{
            //status del book a CONFIRMED
            toConfirmBooking.confirm()
            await this.bookingRepository.updateAsync(toConfirmBooking);

        }catch(error){
            throw new Error(`Error during confirm booking process: ${error.message}`);
        }
    }

    async HandleCheckInBookingAsync(bookingId: number): Promise<void> {

       const toCheckInBooking: Booking = await this.bookingRepository.findByIdAsync(bookingId);

       try{
           //status del book a CHECKED_IN
           toCheckInBooking.checkIn();
           //generar nfc key para el book
           const nfcKey = NfcTokenGenerator.generateNfcToken();
           await this.bookingRepository.updateAsync(toCheckInBooking);

           //asignar nfc key a el room
           await this.externalRoomService.addNfcKeyToRoom(toCheckInBooking.roomId, nfcKey);
           //actualizar el status del room a OCCUPIED
           await this.externalRoomService.changeRoomStatusToOccupied(toCheckInBooking.roomId);


            // asignar nfc key a el guest profile
           await this.externalGuestProfileService.addNfcKeyToGuestProfile(toCheckInBooking.guestId, nfcKey);
           // actualizar el sattus del guest profile a ACTIVE
           await this.externalGuestProfileService.changeGuestStatusToActive(toCheckInBooking.guestId);


       }catch(error){
           throw new Error(`Error during check-in process: ${error.message}`);
       }

    }
    async HandleCheckOutBookingAsync(bookingId: number): Promise<void> {

        const toCheckOutBooking: Booking = await this.bookingRepository.findByIdAsync(bookingId);

        try{
            //actualizar el status del book a CHECKED_OUT
            toCheckOutBooking.checkOut();
            await this.bookingRepository.updateAsync(toCheckOutBooking);

            await this.externalRoomService.deleteNfcKeyFromRoom(toCheckOutBooking.roomId)
            await this.externalRoomService.changeRoomStatusToMaintenance(toCheckOutBooking.roomId);

            await this.externalGuestProfileService.removeNfcKeyFromGuestProfile(toCheckOutBooking.guestId);
            await this.externalGuestProfileService.changeGuestStatusToInactive(toCheckOutBooking.guestId);

        }catch(error){
            throw new Error(`Error during check-out process: ${error.message}`);
        }

    }

    HandleCancelBookingAsync(bookingId: number): Promise<Booking> {
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
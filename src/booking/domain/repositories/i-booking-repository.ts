import {Booking} from "../model/aggregates/Booking";
import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";
import {BookStatus} from "../model/valueObjects/BookStatus";



export interface IBookingRepository<AdministratorProfile> extends IBaseRepository<Booking> {

    findBooksByCheckInDate(checkInDate: Date): Promise<Booking[]>;
    findBooksByStatus(status: BookStatus): Promise<Booking[]>;
    findBooksByGuestId(guestId: number): Promise<Booking[]>;
    findBooksByHotelId(hotelId: number): Promise<Booking[]>;
    findBooksByNfcKey(nfcKey: string): Promise<Booking[]>;

}
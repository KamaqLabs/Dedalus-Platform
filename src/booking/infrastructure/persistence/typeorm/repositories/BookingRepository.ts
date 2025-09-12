import {Booking} from "../../../../domain/model/aggregates/Booking";
import {IBookingRepository} from "../../../../domain/repositories/i-booking-repository";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {GuestProfile} from "../../../../../profiles/domain/model/aggregates/Guest-Profile";
import {Repository, In} from "typeorm";
import {BookStatus} from "../../../../domain/model/valueObjects/BookStatus";


@Injectable()
export class BookingRepository extends BaseRepository<Booking>
    implements IBookingRepository<Booking> {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>
    ) {
        super(bookingRepository);
    }
    
    async findBooksByCheckInDate(checkInDate: Date): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { checkInDate } });
    }

    async findBooksByStatus(status: BookStatus): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { bookStatus: status } });
    }

    async findBooksByGuestId(guestId: number): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { guestId } });
    }

    async findBooksByHotelId(hotelId: number): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { hotelId } });
    }

    async findBooksByNfcKey(nfcKey: string): Promise<Booking[]> {
        return this.bookingRepository.find({ where: { nfcKey } });
    }

    // Nuevas funciones recomendadas para el repository:
    async findBooksByDateRange(startDate: Date, endDate: Date): Promise<Booking[]> {
        return this.bookingRepository.createQueryBuilder('booking')
            .where('booking.checkInDate >= :startDate', { startDate })
            .andWhere('booking.checkOutDate <= :endDate', { endDate })
            .getMany();
    }

    async findActiveBooksByHotelId(hotelId: number): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: {
                hotelId,
                bookStatus: In([BookStatus.CONFIRMED, BookStatus.CHECKED_IN])
            }
        });
    }

    async findOverlappingBookings(guestId: number, checkIn: Date, checkOut: Date): Promise<Booking[]> {
        return this.bookingRepository.createQueryBuilder('booking')
            .where('booking.guestId = :guestId', { guestId })
            .andWhere('booking.checkInDate < :checkOut', { checkOut })
            .andWhere('booking.checkOutDate > :checkIn', { checkIn })
            .andWhere('booking.bookStatus NOT IN (:...cancelledStatuses)', {
                cancelledStatuses: [BookStatus.CANCELLED]
            })
            .getMany();
    }

    async countBooksByStatus(hotelId: number, status: BookStatus): Promise<number> {
        return this.bookingRepository.count({
            where: { hotelId, bookStatus: status }
        });
    }

    async calculateTotalRevenue(hotelId: number): Promise<number> {
        const result = await this.bookingRepository.createQueryBuilder('booking')
            .select('SUM(booking.totalPrice)', 'total')
            .where('booking.hotelId = :hotelId', { hotelId })
            .andWhere('booking.bookStatus = :status', { status: BookStatus.CHECKED_OUT })
            .getRawOne();
        return result?.total || 0;
    }

    async findUpcomingCheckIns(hotelId: number, date: Date): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: {
                hotelId,
                checkInDate: date,
                bookStatus: BookStatus.CONFIRMED
            }
        });
    }

    async findUpcomingCheckOuts(hotelId: number, date: Date): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: {
                hotelId,
                checkOutDate: date,
                bookStatus: BookStatus.CHECKED_IN
            }
        });
    }

    async findExpiredPendingBookings(hotelId: number, expirationHours: number): Promise<Booking[]> {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() - expirationHours);

        return this.bookingRepository.createQueryBuilder('booking')
            .where('booking.hotelId = :hotelId', { hotelId })
            .andWhere('booking.bookStatus = :status', { status: BookStatus.PENDING })
            .andWhere('booking.createdAt < :expirationDate', { expirationDate })
            .getMany();
    }
}
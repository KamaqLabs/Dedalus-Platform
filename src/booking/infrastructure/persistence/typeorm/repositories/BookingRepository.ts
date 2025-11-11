import {Booking} from "../../../../domain/model/aggregates/Booking";
import {IBookingRepository} from "../../../../domain/repositories/i-booking-repository";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {GuestProfile} from "../../../../../profiles/domain/model/aggregates/Guest-Profile";
import {Repository, In} from "typeorm";
import {BookStatus} from "../../../../domain/model/valueObjects/BookStatus";
import {Room} from "../../../../../hotel/domain/model/aggregates/Room";
import {RoomStatus} from "../../../../../hotel/domain/model/valueobjects/RoomStatus";
import {ToPeruvianTimeZoneService} from "../../../../application/internal/utils/to-peruvian-time-zone.service";


@Injectable()
export class BookingRepository extends BaseRepository<Booking>
    implements IBookingRepository<Booking> {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @Inject()
        private readonly peruTimeService: ToPeruvianTimeZoneService
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

    findBookByRoomId(roomId: number): Promise<Booking> {
        throw new Error("Method not implemented.");
    }




    async isRoomAvailable(roomId: number, checkInDate: Date, checkOutDate: Date): Promise<boolean> {
        const conflictingBookings = await this.bookingRepository
            .createQueryBuilder('booking')
            .where('booking.roomId = :roomId', { roomId })
            .andWhere('booking.bookStatus IN (:...activeStatuses)', {
                activeStatuses: [BookStatus.CONFIRMED, BookStatus.CHECKED_IN, BookStatus.PENDING]
            })
            .andWhere(
                '(booking.checkInDate < :checkOutDate AND booking.checkOutDate > :checkInDate)',
                { checkInDate, checkOutDate }
            )
            .getCount();

        return conflictingBookings === 0;
    }

    async findConflictingBookings(roomId: number, checkInDate: Date, checkOutDate: Date): Promise<Booking[]> {
        return await this.bookingRepository
            .createQueryBuilder('booking')
            .where('booking.roomId = :roomId', { roomId })
            .andWhere('booking.bookStatus IN (:...activeStatuses)', {
                activeStatuses: [BookStatus.CONFIRMED, BookStatus.CHECKED_IN, BookStatus.PENDING]
            })
            .andWhere(
                '(booking.checkInDate < :checkOutDate AND booking.checkOutDate > :checkInDate)',
                { checkInDate, checkOutDate }
            )
            .orderBy('booking.checkInDate', 'ASC')
            .getMany();
    }

    async findAvailableRoomsByDateRange(hotelId: number, checkInDate: Date, checkOutDate: Date): Promise<number[]> {

        const occupiedRoomsSubquery = this.bookingRepository
            .createQueryBuilder('booking')
            .select('DISTINCT booking.roomId')
            .where('booking.hotelId = :hotelId', { hotelId })
            .andWhere('booking.bookStatus IN (:...activeStatuses)', {
                activeStatuses: [BookStatus.CONFIRMED, BookStatus.CHECKED_IN, BookStatus.PENDING]
            })
            .andWhere(
                '(booking.checkInDate < :checkOutDate AND booking.checkOutDate > :checkInDate)',
                { checkInDate, checkOutDate }
            );


        const occupiedRooms = await occupiedRoomsSubquery.getRawMany();
        const occupiedRoomIds = occupiedRooms.map(room => room.booking_room_id);

        return occupiedRoomIds;
    }

    async findBookingsReadyForReminder(tomorrow: Date, dayAfterTomorrow: Date): Promise<Booking[]> {
        return await this.bookingRepository
            .createQueryBuilder('booking')
            .where('booking.bookStatus = :status', { status: BookStatus.PENDING })
            .andWhere('booking.checkInDate >= :tomorrow', { tomorrow })
            .andWhere('booking.checkInDate < :dayAfter', { dayAfter: dayAfterTomorrow })
            .getMany();
    }

    async findBookingsForStatusUpdate(): Promise<{ readyForCheckIn: Booking[], pendingConfirmation: Booking[], readyForCheckOut: Booking[] }> {
        const now = this.peruTimeService.getCurrentPeruvianTime();
        const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

        const allBookings = await this.bookingRepository
            .createQueryBuilder('booking')
            .where('(booking.bookStatus = :pending AND booking.checkInDate <= :in24Hours AND booking.checkInDate > :now)', {
                pending: BookStatus.PENDING,
                in24Hours,
                now
            })
            .orWhere('(booking.bookStatus = :confirmed AND booking.checkInDate <= :now)', {
                confirmed: BookStatus.CONFIRMED,
                now
            })
            .orWhere('(booking.bookStatus = :checkedIn AND booking.checkOutDate <= :now)', {
                checkedIn: BookStatus.CHECKED_IN,
                now
            })
            .getMany();

        const readyForCheckIn = allBookings.filter(booking =>
            booking.bookStatus === BookStatus.CONFIRMED && booking.checkInDate <= now
        );

        const pendingConfirmation = allBookings.filter(booking =>
            booking.bookStatus === BookStatus.PENDING &&
            booking.checkInDate > now &&
            booking.checkInDate <= in24Hours
        );

        const readyForCheckOut = allBookings.filter(booking =>
            booking.bookStatus === BookStatus.CHECKED_IN &&
            booking.checkOutDate <= now
        );

        return { readyForCheckIn, pendingConfirmation, readyForCheckOut };
    }

    async updateBookingsToCheckedIn(bookingIds: number[]): Promise<void> {
        if (bookingIds.length === 0) return;

        await this.bookingRepository
            .createQueryBuilder()
            .update(Booking)
            .set({ bookStatus: BookStatus.CHECKED_IN })
            .whereInIds(bookingIds)
            .execute();
    }

    async updateBookingsToConfirmed(bookingIds: number[]): Promise<void> {
        if (bookingIds.length === 0) return;

        await this.bookingRepository
            .createQueryBuilder()
            .update(Booking)
            .set({ bookStatus: BookStatus.CONFIRMED })
            .whereInIds(bookingIds)
            .execute();
    }

    async updateBookingsToCheckedInWithRoomStatus(bookingIds: number[]): Promise<void> {
        if (bookingIds.length === 0) return;

        await this.bookingRepository.manager.transaction(async transactionalEntityManager => {
            const bookings = await transactionalEntityManager
                .createQueryBuilder(Booking, 'booking')
                .select('booking.roomId')
                .whereInIds(bookingIds)
                .getMany();

            const roomIds = bookings.map(booking => booking.roomId);

            await transactionalEntityManager
                .createQueryBuilder()
                .update(Booking)
                .set({ bookStatus: BookStatus.CHECKED_IN })
                .whereInIds(bookingIds)
                .execute();

            if (roomIds.length > 0) {
                await transactionalEntityManager
                    .createQueryBuilder()
                    .update(Room)
                    .set({ roomStatus: RoomStatus.OCCUPIED })
                    .whereInIds(roomIds)
                    .execute();
            }
        });
    }

    async updateBookingsToCheckedOutWithRoomStatus(checkOutIds: number[]): Promise<void> {
        if (checkOutIds.length === 0) return;

        await this.bookingRepository.manager.transaction(async transactionalEntityManager => {
            // Obtener las reservas y sus roomIds
            const bookings = await transactionalEntityManager
                .createQueryBuilder(Booking, 'booking')
                .select('booking.roomId')
                .whereInIds(checkOutIds)
                .getMany();

            const roomIds = bookings.map(booking => booking.roomId);

            // Actualizar estado de las reservas a CHECKED_OUT
            await transactionalEntityManager
                .createQueryBuilder()
                .update(Booking)
                .set({ bookStatus: BookStatus.CHECKED_OUT })
                .whereInIds(checkOutIds)
                .execute();

            // Actualizar estado de las habitaciones a CLEANING
            if (roomIds.length > 0) {
                await transactionalEntityManager
                    .createQueryBuilder()
                    .update(Room)
                    .set({ roomStatus: RoomStatus.MAINTENANCE })
                    .whereInIds(roomIds)
                    .execute();
            }
        });
    }





}
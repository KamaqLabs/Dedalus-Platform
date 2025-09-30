import { BookStatus } from '../../../domain/model/valueObjects/BookStatus';
import { EStatus } from '../../../../profiles/domain/model/value-objects/e-status';

export class BookInformationResourceDto {
    id: number;
    hotelId: number;
    roomId: number;
    checkInDate: Date;
    checkOutDate: Date;
    bookStatus: BookStatus;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;

    guest: {
        id: number;
        name: string;
        lastName: string;
        dni: string;
        email: string;
        phoneNumber: string;
        status: EStatus;
        nfcKey: string | null;
        guestCode: string;
        accountId: number | null;
        createdAt: Date;
        updatedAt: Date;
    };

    durationInDays: number;
    isActive: boolean;

    constructor(
        id: number,
        hotelId: number,
        roomId: number,
        checkInDate: Date,
        checkOutDate: Date,
        bookStatus: BookStatus,
        totalPrice: number,
        createdAt: Date,
        updatedAt: Date,
        guest: {
            id: number;
            name: string;
            lastName: string;
            dni: string;
            email: string;
            phoneNumber: string;
            status: EStatus;
            nfcKey: string | null;
            guestCode: string;
            accountId: number | null;
            createdAt: Date;
            updatedAt: Date;
        }
    ) {
        this.id = id;
        this.hotelId = hotelId;
        this.roomId = roomId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookStatus = bookStatus;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.guest = guest;

        // Calcular propiedades derivadas
        this.durationInDays = this.calculateDurationInDays();
        this.isActive = this.checkIfActive();
    }

    static fromBookingAndGuest(booking: any, guestProfile: any): BookInformationResourceDto {
        return new BookInformationResourceDto(
            booking.id,
            booking.hotelId,
            booking.roomId,
            booking.checkInDate,
            booking.checkOutDate,
            booking.bookStatus,
            booking.totalPrice,
            booking.createdAt,
            booking.updatedAt,
            {
                id: guestProfile.id,
                name: guestProfile.name,
                lastName: guestProfile.lastName,
                dni: guestProfile.dni,
                email: guestProfile.email,
                phoneNumber: guestProfile.phoneNumber,
                status: guestProfile.status,
                nfcKey: guestProfile.nfcKey,
                guestCode: guestProfile.guestCode,
                accountId: guestProfile.accountId,
                createdAt: guestProfile.createdAt,
                updatedAt: guestProfile.updatedAt
            }
        );
    }

    private calculateDurationInDays(): number {
        const timeDiff = this.checkOutDate.getTime() - this.checkInDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    private checkIfActive(): boolean {
        return this.bookStatus === BookStatus.CONFIRMED || this.bookStatus === BookStatus.CHECKED_IN;
    }
}
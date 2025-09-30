import {Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {BookStatus} from "../valueObjects/BookStatus";
import {CreateBookCommand} from "../commands/create-book.command";

@Entity('booking')
export class Booking {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'guest_id', nullable: false})
    guestId: number;

    @Column({name: 'hotel_id', nullable: false})
    hotelId: number;

    @Column({name: 'room_id', nullable: false})
     roomId: number;

    @Column({name: 'check_in_date', type: "datetime", nullable: false})
    checkInDate: Date;

    @Column({name: 'check_out_date', type: "datetime", nullable: false})
    checkOutDate: Date;

    @Column({
        name: 'status',
        type: "enum",
        enum: BookStatus,
        default: BookStatus.PENDING
    })
    bookStatus: BookStatus;

    @Column({name: 'total_price', type: "decimal", precision: 10, scale: 2, nullable: false})
    totalPrice: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    // Constructor

    static ConstructBookingFromCommand(command: CreateBookCommand, hotelId:number): Booking {
        const booking = new Booking();
        booking.guestId = command.guestId;
        booking.hotelId = hotelId;
        booking.roomId = command.roomId;
        booking.checkInDate = command.checkInDate;
        booking.checkOutDate = command.checkOutDate;
        booking.bookStatus = BookStatus.PENDING;

        return booking;
    }

    static ConstructInstantBookingFromCommand(command: CreateBookCommand, hotelId:number): Booking {
        const booking = new Booking();
        booking.guestId = command.guestId;
        booking.hotelId = hotelId;
        booking.roomId = command.roomId;
        booking.checkInDate = command.checkInDate;
        booking.checkOutDate = command.checkOutDate;
        booking.bookStatus = BookStatus.CONFIRMED;

        return booking;
    }

    constructor() {
    }


    public updateStatus(status: BookStatus): void {
        this.bookStatus = status;
    }

    public addPrice(amount: number): void {
        this.totalPrice += amount;
    }

    public isActive(): boolean {
        return this.bookStatus === BookStatus.CONFIRMED || this.bookStatus === BookStatus.CHECKED_IN;
    }
}
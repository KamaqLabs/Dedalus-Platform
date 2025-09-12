import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CreateRoomClassCommand} from "../commands/create-room-class.command";
import {UpdateRoomClassCommand} from "../commands/update-room-class.command";

@Entity('room_class')
export class RoomClass {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'hotel_id', type: 'int', nullable: false })
    hotelId: number;

    @Column({name: 'room_class_name', nullable: false})
    roomClassName: string;

    @Column({name: 'max_occupancy', type: "int", nullable: false})
    maxOccupancy: number;

    @Column({name: 'default_price_per_night', type: "decimal", precision: 10, scale: 2, nullable: false})
    defaultPricePerNight: number;

    @Column({name: 'description', type: "text", nullable: false})
    description: string;

    static ConstructRoomClassFromCommand(command: CreateRoomClassCommand, hotelId: number): RoomClass {
        const roomClass = new RoomClass();
        roomClass.roomClassName = command.roomClassName;
        roomClass.hotelId = hotelId;
        roomClass.maxOccupancy = command.maxOccupancy;
        roomClass.defaultPricePerNight = command.defaultPricePerNight;
        roomClass.description = command.description;
        return roomClass;
    }
    static UpdateRoomClassFromCommand(command: UpdateRoomClassCommand, roomClassId: number): RoomClass {
        const roomClass = new RoomClass();
        roomClass.id = roomClassId;
        roomClass.roomClassName = command.roomClassName;
        roomClass.maxOccupancy = command.maxOccupancy;
        roomClass.defaultPricePerNight = command.defaultPricePerNight;
        roomClass.description = command.description;
        return roomClass;
    }

}
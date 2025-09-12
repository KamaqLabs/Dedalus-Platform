import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CreateHotelCommand} from "../commands/create-hotel.command";
import {UpdateHotelCommand} from "../commands/update-hotel.command";

@Entity()
export class Hotel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'hotel_name', nullable: false})
    name: string;

    @Column({name: 'hotel_ruc', nullable: false})
    ruc: string;

    @Column({name: 'hotel_address', nullable: false})
    address: string;

    static ConstructHotelFromCommand(command: CreateHotelCommand){
        const hotel= new Hotel();
        hotel.name = command.name;
        hotel.ruc = command.ruc;
        hotel.address = command.address;
        return hotel;
    }

    static UpdateHotelFromCommand(command: UpdateHotelCommand, hotelId: number){
        const hotel= new Hotel();
        hotel.id = hotelId;
        hotel.name = command.name;
        hotel.ruc = command.ruc;
        hotel.address = command.address;
        return hotel;
    }
}
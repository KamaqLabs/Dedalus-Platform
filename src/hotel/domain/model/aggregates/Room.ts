import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {RoomStatus} from "../valueobjects/RoomStatus";
import {CreateRoomCommand} from "../commands/create-room.command";
import {UpdateRoomCommand} from "../commands/update-room.command";

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'hotel_id', type: 'int', nullable: false })
    hotelId: number;

    @Column({ name: 'room_number', type: 'varchar', length: 10, nullable: false })
    roomNumber: string;

    @Column({ name: 'floor', type: 'int', nullable: false })
    floor: number;

    @Column({ name: 'nfc_key', type: 'varchar', length: 100, nullable: true, default: null })
    nfcKey: string | null;

    @Column("simple-array")
    modulesId: number[];

    @Column({ name: 'status', type: 'enum', enum: RoomStatus, default: RoomStatus.AVAILABLE })
    roomStatus: RoomStatus;

    @Column({ name: 'room_class_id', type: 'int', nullable: false })
    roomClassId: number;

    static ConstructRoomFromCommand(command: CreateRoomCommand){
        const room = new Room();
        room.roomNumber = command.roomNumber;
        room.floor = command.floor;
        room.nfcKey = null;
        room.modulesId = command.modules;
        room.roomStatus = command.roomStatus || RoomStatus.AVAILABLE;
        room.roomClassId = command.roomClassId;
        return room;
    }




    static AddNfcKey(room: Room, nfcKey: string): Room{
        room.nfcKey = nfcKey;
        return room;
    }

    static DeleteNfcKey(room: Room): Room{
        room.nfcKey = null;
        return room;
    }

    static UpdateRoomStatus(room: Room, status: RoomStatus): Room{
        room.roomStatus = status;
        return room;
    }

    static UpdateRoomClass(room: Room, roomClassId: number): Room{
        room.roomClassId = roomClassId;
        return room;
    }

    static AddModule(room: Room, moduleId: number): Room{
        if(!room.modulesId.includes(moduleId)){
            room.modulesId.push(moduleId);
        }
        return room;
    }

    static RemoveModule(room: Room, moduleId: number): Room{
        room.modulesId = room.modulesId.filter(id => id !== moduleId);
        return room;
    }
}
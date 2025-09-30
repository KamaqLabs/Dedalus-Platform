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

    @Column({ name: 'modules_id', type: 'json' })
    modulesId: number[];

    @Column({ name: 'room_status', type: 'enum', enum: RoomStatus, default: RoomStatus.AVAILABLE })
    roomStatus: RoomStatus;

    @Column({ name: 'room_class_id', type: 'int', nullable: false })
    roomClassId: number;

    static ConstructRoomFromCommand(command: CreateRoomCommand, hotelId:number){
        const room = new Room();
        room.roomNumber = command.roomNumber;
        room.hotelId= hotelId;
        room.floor = command.floor;
        room.nfcKey = null;
        room.modulesId = [];
        room.roomStatus = command.roomStatus || RoomStatus.AVAILABLE;
        room.roomClassId = command.roomClassId;
        return room;
    }

    static UpdateRoomFromCommand(room: Room, command: UpdateRoomCommand): Room{
        room.roomNumber = command.roomNumber || room.roomNumber;
        room.floor = command.floor || room.floor;
        room.roomClassId = command.roomClassId || room.roomClassId;
        return room;
    }

    public static AddNfcKey(room: Room, nfcKey: string): Room{
        room.nfcKey = nfcKey;
        return room;
    }

    public static DeleteNfcKey(room: Room): Room{
        room.nfcKey = null;
        return room;
    }

    public static UpdateRoomStatus(room: Room, status: RoomStatus): Room{
        room.roomStatus = status;
        return room;
    }

    public static UpdateRoomClass(room: Room, roomClassId: number): Room{
        room.roomClassId = roomClassId;
        return room;
    }

    public static AddModule(room: Room, moduleId: number): Room{
        if(!room.modulesId.includes(moduleId)){
            room.modulesId.push(moduleId);
        }
        return room;
    }

    public static RemoveModule(room: Room, moduleId: number): Room{
        room.modulesId = room.modulesId.filter(id => id !== moduleId);
        return room;
    }

}
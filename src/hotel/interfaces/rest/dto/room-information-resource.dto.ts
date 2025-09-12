import { RoomStatus } from "../../../domain/model/valueobjects/RoomStatus";
import { RoomClassInformationDto } from "./room-class-information.dto";
import {Room} from "../../../domain/model/aggregates/Room";
import {RoomClass} from "../../../domain/model/entites/RoomClass";

export class RoomInformationResourceDto {
    id: number;
    hotelId: number;
    roomNumber: string;
    floor: number;
    nfcKey: string | null;
    modulesId: number[];
    roomStatus: RoomStatus;
    roomClass: RoomClassInformationDto;

    constructor(
        id: number,
        hotelId: number,
        roomNumber: string,
        floor: number,
        nfcKey: string | null,
        modulesId: number[],
        roomStatus: RoomStatus,
        roomClass: RoomClassInformationDto
    ) {
        this.id = id;
        this.hotelId = hotelId;
        this.roomNumber = roomNumber;
        this.floor = floor;
        this.nfcKey = nfcKey;
        this.modulesId = modulesId;
        this.roomStatus = roomStatus;
        this.roomClass = roomClass;
    }

    static fromEntities(room: Room, roomClass: RoomClass): RoomInformationResourceDto {
        const roomClassDto = new RoomClassInformationDto(roomClass);
        return new RoomInformationResourceDto(
            room.id,
            room.hotelId,
            room.roomNumber,
            room.floor,
            room.nfcKey,
            room.modulesId,
            room.roomStatus,
            roomClassDto
        );
    }
}

import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";
import {RoomClass} from "../model/entites/RoomClass";
import {RoomInformationResourceDto} from "../../interfaces/rest/dto/room-information-resource.dto";
import {RoomStatus} from "../model/valueobjects/RoomStatus";


export interface IRoomRepository<Room> extends IBaseRepository<Room> {
    findByHotelIdAsync(hotelId: number): Promise<Room>;
    findByRoomNumberAsync(roomNumber: number): Promise<Room>;
    findByFloorAsync(floorNumber:number): Promise<Room[]>;
    findByNfcKeyAsync(nfcKey: string): Promise<Room>;
    findByStatusAsync(status: RoomStatus): Promise<Room[]>;
    findByRoomClassIdAsync(roomClassId:number): Promise<Room[]>;
}
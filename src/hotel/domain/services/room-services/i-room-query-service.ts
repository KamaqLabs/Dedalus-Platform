import {GetRoomByClassIdQuery} from "../../queries/room-queries/get-room-by-class-id.query";
import {GetRoomByFloorNumberQuery} from "../../queries/room-queries/get-room-by-floor-number.query";
import {GetRoomByHotelIdQuery} from "../../queries/room-queries/get-room-by-hotel-id.query";
import {GetRoomByNfcKeyQuery} from "../../queries/room-queries/get-room-by-nfc-key.query";
import {GetRoomByRoomNumberQuery} from "../../queries/room-queries/get-room-by-room-number.query";
import {GetRoomByStatusQuery} from "../../queries/room-queries/get-room-by-status.query";
import {RoomInformationResourceDto} from "../../../interfaces/rest/dto/room-information-resource.dto";
import {Room} from "../../model/aggregates/Room";

export interface IRoomQueryService{
    HandleGetRoomById(roomId: number): Promise<RoomInformationResourceDto>;
    HandleGetRoomsByClassId(query: GetRoomByClassIdQuery): Promise<Room[]>;
    HandleGetRoomsByFloorId(query: GetRoomByFloorNumberQuery): Promise<RoomInformationResourceDto[]>;
    HandleGetRoomsByHotelId(query: GetRoomByHotelIdQuery): Promise<RoomInformationResourceDto[]>;
    HandleGetRoomByNfcKey(query : GetRoomByNfcKeyQuery): Promise<Room>;
    HandleGetRoomByRoomNumber(query: GetRoomByRoomNumberQuery): Promise<RoomInformationResourceDto>;
    HandleGetRoomsByStatus(query: GetRoomByStatusQuery): Promise<RoomInformationResourceDto[]>;
    HandleRoomExists(roomId: number): Promise<boolean>;

}
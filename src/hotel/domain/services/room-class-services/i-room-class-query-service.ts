import {RoomClass} from "../../model/entites/RoomClass";
import {GetRoomClassByIdQuery} from "../../queries/room-class-queries/get-room-class-by-id.query";
import {GetAllRoomClassesQuery} from "../../queries/room-class-queries/get-all-room-classes.query";
import {GetRoomClassesByHotelIdQuery} from "../../queries/room-class-queries/get-room-classes-by-hotel-id.query";
import {GetRoomClassesByNameQuery} from "../../queries/room-class-queries/get-room-classes-by-name.query";
import {GetRoomClassesByCapacityQuery} from "../../queries/room-class-queries/get-room-classes-by-capacity.query";
import {GetRoomClassesByPriceRangeQuery} from "../../queries/room-class-queries/get-room-classes-by-price-range.query";
import {RoomClassInformationDto} from "../../../interfaces/rest/dto/room-class-information.dto";


export interface IRoomClassQueryService {
    HandleGetRoomClassById(query: GetRoomClassByIdQuery): Promise<RoomClass>;
    HandleGetAllRoomClasses(query: GetAllRoomClassesQuery): Promise<RoomClass[]>;
    HandleGetRoomClassesByHotelId(query: GetRoomClassesByHotelIdQuery): Promise<RoomClass[]>;
    HandleGetRoomClassesByName(query: GetRoomClassesByNameQuery): Promise<RoomClass>;
    HandleGetRoomClassesByCapacity(query: GetRoomClassesByCapacityQuery): Promise<RoomClass[]>;
    HandleGetRoomClassesByPriceRange(query: GetRoomClassesByPriceRangeQuery): Promise<RoomClass[]>;
    HandleGetRoomClassInformationById(query: GetRoomClassByIdQuery): Promise<RoomClassInformationDto>;
}
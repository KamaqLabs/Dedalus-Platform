import {Inject, Injectable} from "@nestjs/common";
import {RoomClass} from "../../../domain/model/entites/RoomClass";
import {IRoomClassQueryService} from "../../../domain/services/room-class-services/i-room-class-query-service";
import { GetAllRoomClassesQuery } from "src/hotel/domain/queries/room-class-queries/get-all-room-classes.query";
import { GetRoomClassByIdQuery } from "src/hotel/domain/queries/room-class-queries/get-room-class-by-id.query";
import { GetRoomClassesByCapacityQuery } from "src/hotel/domain/queries/room-class-queries/get-room-classes-by-capacity.query";
import { GetRoomClassesByHotelIdQuery } from "src/hotel/domain/queries/room-class-queries/get-room-classes-by-hotel-id.query";
import { GetRoomClassesByNameQuery } from "src/hotel/domain/queries/room-class-queries/get-room-classes-by-name.query";
import { GetRoomClassesByPriceRangeQuery } from "src/hotel/domain/queries/room-class-queries/get-room-classes-by-price-range.query";
import {IRoomClassRepository} from "../../../domain/repositories/i-room-class-repository";
import {HotelCommandService} from "../commandservices/hotel-command.service";
import { RoomClassInformationDto } from "src/hotel/interfaces/rest/dto/room-class-information.dto";
import {ROOM_CLASS_REPOSITORY_TOKEN} from "../../../domain/repositories/room-class-repository.token";
import {HotelNotFoundError} from "../../errors/hotel-errors/hotel-not-found.error";
import {RoomClassNotFoundError} from "../../errors/room-class-errors/room-class-not-found.error";

@Injectable()
export class RoomClassQueryService implements IRoomClassQueryService {
    constructor(
        @Inject(ROOM_CLASS_REPOSITORY_TOKEN)
        private readonly roomClassRepository: IRoomClassRepository<RoomClass>,
        private readonly hotelCommandService: HotelCommandService,
    ) {
    }

    async HandleGetRoomClassById(query: GetRoomClassByIdQuery): Promise<RoomClass> {
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(query.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(query.roomClassId);
        }
        return roomClass;
    }
    async HandleGetAllRoomClasses(query: GetAllRoomClassesQuery): Promise<RoomClass[]> {
        return await this.roomClassRepository.findAll();
    }
    async HandleGetRoomClassesByHotelId(query: GetRoomClassesByHotelIdQuery): Promise<RoomClass[]> {
        if(!(await this.hotelCommandService.HandleIsHotelExists(query.hotelId))){
            throw new HotelNotFoundError(query.hotelId);
        }
        return await this.roomClassRepository.findByHotelId(query.hotelId);
    }
    async HandleGetRoomClassesByName(query: GetRoomClassesByNameQuery): Promise<RoomClass> {
        return await this.roomClassRepository.findByClassNameAsync(query.roomClassName);
    }
    async HandleGetRoomClassesByCapacity(query: GetRoomClassesByCapacityQuery): Promise<RoomClass[]> {
        return await this.roomClassRepository.findByMaxOccupancyAsync(query.maxOccupancy);
    }
    async HandleGetRoomClassesByPriceRange(query: GetRoomClassesByPriceRangeQuery): Promise<RoomClass[]> {
        return await this.roomClassRepository.findByPriceRangeAsync(query.minPrice, query.maxPrice);
    }

    async HandleGetRoomClassInformationById(query: GetRoomClassByIdQuery): Promise<RoomClassInformationDto> {
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(query.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(query.roomClassId);
        }
        return new RoomClassInformationDto(roomClass);

    }

}
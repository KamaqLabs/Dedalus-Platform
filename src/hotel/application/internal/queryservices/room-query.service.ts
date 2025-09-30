import {Inject, Injectable} from "@nestjs/common";
import {ROOM_REPOSITORY_TOKEN} from "../../../domain/repositories/room-repository.token";
import {RoomRepository} from "../../../infrastructure/persistence/typeorm/repositories/RoomRepository";
import {HotelCommandService} from "../commandservices/hotel-command.service";
import {IRoomQueryService} from "../../../domain/services/room-services/i-room-query-service";
import { Room } from "src/hotel/domain/model/aggregates/Room";
import { GetRoomByClassIdQuery } from "src/hotel/domain/queries/room-queries/get-room-by-class-id.query";
import { GetRoomByFloorNumberQuery } from "src/hotel/domain/queries/room-queries/get-room-by-floor-number.query";
import { GetRoomByHotelIdQuery } from "src/hotel/domain/queries/room-queries/get-room-by-hotel-id.query";
import { GetRoomByNfcKeyQuery } from "src/hotel/domain/queries/room-queries/get-room-by-nfc-key.query";
import { GetRoomByRoomNumberQuery } from "src/hotel/domain/queries/room-queries/get-room-by-room-number.query";
import { GetRoomByStatusQuery } from "src/hotel/domain/queries/room-queries/get-room-by-status.query";
import { RoomInformationResourceDto } from "src/hotel/interfaces/rest/dto/room-information-resource.dto";
import {RoomClassRepository} from "../../../infrastructure/persistence/typeorm/repositories/RoomClassRepository";
import {IRoomRepository} from "../../../domain/repositories/i-room-repository";
import {ROOM_CLASS_REPOSITORY_TOKEN} from "../../../domain/repositories/room-class-repository.token";
import {RoomNotFoundError} from "../../errors/room-errors/room-not-found.error";
import {RoomClassNotFoundError} from "../../errors/room-class-errors/room-class-not-found.error";
import {RoomNumberNotFoundError} from "../../errors/room-errors/room-number-not-found.error";


@Injectable()
export class RoomQueryService implements IRoomQueryService {
    constructor(
        @Inject(ROOM_REPOSITORY_TOKEN)
        private readonly roomRepository: IRoomRepository<Room>,
        private readonly hotelCommandService: HotelCommandService,
        @Inject(ROOM_CLASS_REPOSITORY_TOKEN)
        private readonly roomClasRepository: RoomClassRepository
    ) {
    }
    async HandleGetRoomById(roomId: number): Promise<RoomInformationResourceDto> {
        const room:Room = await this.roomRepository.findByIdAsync(roomId);
        if(!room) {
            throw new RoomNotFoundError(roomId)
        }
        const roomClass = await this.roomClasRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        return RoomInformationResourceDto.fromEntities(room, roomClass);

    }
    async HandleGetRoomsByClassId(query: GetRoomByClassIdQuery): Promise<Room[]> {
        if(await this.roomClasRepository.findByIdAsync(query.classId)){
            throw new RoomClassNotFoundError(query.classId);
        }
        return await this.roomRepository.findByRoomClassIdAsync(query.classId);
    }

    async HandleGetRoomsByFloorId(query: GetRoomByFloorNumberQuery): Promise<RoomInformationResourceDto[]> {
        const rooms: Room[] = await this.roomRepository.findByFloorAsync(query.floorNumber);
        if (rooms.length === 0) {
            return [];
        }
        const roomInformationDtos: RoomInformationResourceDto[] = [];
        for (const room of rooms) {
            const roomClass = await this.roomClasRepository.findByIdAsync(room.roomClassId);
            if (!roomClass) {
                throw new RoomClassNotFoundError(room.roomClassId);
            }
            roomInformationDtos.push(RoomInformationResourceDto.fromEntities(room, roomClass));
        }
        return roomInformationDtos;
    }
    async HandleGetRoomsByHotelId(query: GetRoomByHotelIdQuery): Promise<RoomInformationResourceDto[]> {
        const rooms: Room[] = await this.roomRepository.findByHotelIdAsync(query.hotelId);
        if (rooms.length === 0) {
            return [];
        }
        const roomInformationDtos: RoomInformationResourceDto[] = [];

        for (const room of rooms) {
            const roomClass = await this.roomClasRepository.findByIdAsync(room.roomClassId);
            if (!roomClass) {
                throw new RoomClassNotFoundError(room.roomClassId);
            }
            roomInformationDtos.push(RoomInformationResourceDto.fromEntities(room, roomClass));
        }
        return roomInformationDtos;

    }
    async HandleGetRoomByNfcKey(query: GetRoomByNfcKeyQuery): Promise<Room> {
        const room:Room = await this.roomRepository.findByNfcKeyAsync(query.nfcKey);
        if(!room) {
            // throw new RoomNotFoundError(query.nfcKey);
        }
        return room;
    }
    async HandleGetRoomByRoomNumber(query: GetRoomByRoomNumberQuery): Promise<RoomInformationResourceDto> {
        const room:Room = await this.roomRepository.findByRoomNumberAsync(query.roomNumber);
        if(!room) {
            throw new RoomNumberNotFoundError(query.roomNumber);
        }
        const roomClass = await this.roomClasRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        return RoomInformationResourceDto.fromEntities(room, roomClass);
    }
    async HandleGetRoomsByStatus(query: GetRoomByStatusQuery): Promise<RoomInformationResourceDto[]> {
        const rooms: Room[] = await this.roomRepository.findByStatusAsync(query.status);
        if (rooms.length === 0) {
            return [];
        }
        const roomInformationDtos: RoomInformationResourceDto[] = [];
        for (const room of rooms) {
            const roomClass = await this.roomClasRepository.findByIdAsync(room.roomClassId);
            if (!roomClass) {
                throw new RoomClassNotFoundError(room.roomClassId);
            }
            roomInformationDtos.push(RoomInformationResourceDto.fromEntities(room, roomClass));
        }
        return roomInformationDtos;
    }

    async HandleRoomExists(roomId: number): Promise<boolean> {
        const room = await this.roomRepository.findByIdAsync(roomId);
        return !!room;

    }

    async HandleGetPricePerNight(roomId: number): Promise<number> {
        const room:Room = await this.roomRepository.findByIdAsync(roomId);
        if(!room) {
            throw new RoomNotFoundError(roomId)
        }
        const roomClass = await this.roomClasRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        return roomClass.defaultPricePerNight;
    }
}
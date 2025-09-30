import {Inject, Injectable} from "@nestjs/common";
import {ROOM_REPOSITORY_TOKEN} from "../../../domain/repositories/room-repository.token";
import {IRoomRepository} from "../../../domain/repositories/i-room-repository";
import {Room} from "../../../domain/model/aggregates/Room";
import {HotelCommandService} from "./hotel-command.service";
import {IRoomCommandService} from "../../../domain/services/room-services/i-room-command-service";
import { AddRoomModuleCommand } from "src/hotel/domain/model/commands/add-room-module.command";
import { AssignNfcKeyCommand } from "src/hotel/domain/model/commands/assign-nfc-key.command";
import { CreateRoomCommand } from "src/hotel/domain/model/commands/create-room.command";
import { RemoveNfcKeyCommand } from "src/hotel/domain/model/commands/remove-nfc-key.command";
import { RemoveRoomModuleCommand } from "src/hotel/domain/model/commands/remove-room-module.command";
import { UpdateRoomCommand } from "src/hotel/domain/model/commands/update-room.command";
import { RoomInformationResourceDto } from "src/hotel/interfaces/rest/dto/room-information-resource.dto";
import {RoomClass} from "../../../domain/model/entites/RoomClass";
import {RoomClassRepository} from "../../../infrastructure/persistence/typeorm/repositories/RoomClassRepository";
import {ROOM_CLASS_REPOSITORY_TOKEN} from "../../../domain/repositories/room-class-repository.token";
import {RoomStatus} from "../../../domain/model/valueobjects/RoomStatus";
import {HotelNotFoundError} from "../../errors/hotel-errors/hotel-not-found.error";
import {RoomClassNotFoundError} from "../../errors/room-class-errors/room-class-not-found.error";
import {RoomNotFoundError} from "../../errors/room-errors/room-not-found.error";
import {RoomNumberExistsError} from "../../errors/room-errors/room-number-exists.error";


@Injectable()
export class RoomCommandService implements IRoomCommandService {
    constructor(
        @Inject(ROOM_REPOSITORY_TOKEN)
        private readonly roomRepository: IRoomRepository<Room>,
        @Inject(ROOM_CLASS_REPOSITORY_TOKEN)
        private readonly roomClassRepository: RoomClassRepository,
        private readonly hotelCommandService: HotelCommandService,
    ) {
    }

    async HandleCreateRoom(command: CreateRoomCommand, hotelId:number): Promise<RoomInformationResourceDto> {
        if(!(await this.hotelCommandService.HandleIsHotelExists(hotelId))){
            throw new HotelNotFoundError(hotelId);
        }
       const room: Room = Room.ConstructRoomFromCommand(command,hotelId);
       const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(command.roomClassId);
       if(!roomClass){
           throw new RoomClassNotFoundError(command.roomClassId);
       }

       const createdRoom = await this.roomRepository.addAsync(room);

       return  RoomInformationResourceDto.fromEntities(createdRoom, roomClass);

    }

    async HandleUpdateRoom(command: UpdateRoomCommand, roomId:number): Promise<RoomInformationResourceDto> {
        const room: Room = await this.roomRepository.findByIdAsync(roomId);
        if(!room) {
            throw new RoomNotFoundError(roomId);
        }
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        if(await this.roomRepository.findByRoomNumberAsync(command.roomNumber) && (await this.roomRepository.findByRoomNumberAsync(command.roomNumber))?.id !== roomId) {
            throw new RoomNumberExistsError(room.roomNumber);

        }
        const updatedRoom:Room = await this.roomRepository.updateAsync(Room.UpdateRoomFromCommand(room, command));
        return  RoomInformationResourceDto.fromEntities(updatedRoom, roomClass);
    }
    async HandleDeleteRoom(roomId: number): Promise<void> {
        const deletedRoom: Room = await this.roomRepository.findByIdAsync(roomId);
        if(!deletedRoom) {
            throw new RoomNotFoundError(roomId);
        }
        await this.roomRepository.deleteAsync(deletedRoom);
        return;
    }
    async HandleAddNfcKey(roomId: number, nfcKey:string): Promise<RoomInformationResourceDto> {
        const room: Room = await this.roomRepository.findByIdAsync(roomId);
        if(!room) {
            throw new RoomNotFoundError(roomId);
        }
        room.nfcKey = nfcKey;
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }

        const updatedRoom:Room = await this.roomRepository.updateAsync(room);
        return  RoomInformationResourceDto.fromEntities(updatedRoom, roomClass);
    }
    async HandleDeleteNfcKey(command: RemoveNfcKeyCommand): Promise<RoomInformationResourceDto> {
        const room: Room = await this.roomRepository.findByIdAsync(command.id);
        if(!room) {
            throw new RoomNotFoundError(command.id);
        }
        room.nfcKey = null;
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        const updatedRoom:Room = await this.roomRepository.updateAsync(room);
        return  RoomInformationResourceDto.fromEntities(updatedRoom, roomClass);
    }
    async HandleUpdateRoomStatus(roomId: number, status: string): Promise<RoomInformationResourceDto> {
        const room: Room = await this.roomRepository.findByIdAsync(roomId);
        if(!room) {
            throw new RoomNotFoundError(roomId);
        }
        if (!Object.values(RoomStatus).includes(status as RoomStatus)) {
            throw new Error(`Estado de habitación inválido: ${status}`);
        }
        room.roomStatus = status as RoomStatus;
        const updatedRoom:Room = await this.roomRepository.updateAsync(room);
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(room.roomClassId);
        return  RoomInformationResourceDto.fromEntities(updatedRoom, roomClass);
    }

    async HandleAddModuleToRoom(command: AddRoomModuleCommand): Promise<RoomInformationResourceDto> {
        const room: Room = await this.roomRepository.findByIdAsync(command.id);
        if(!room) {
            throw new RoomNotFoundError(command.id);
        }
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        const updatedRoom: Room = Room.AddModule(room, command.module);
        const savedRoom: Room = await this.roomRepository.updateAsync(updatedRoom);
        return RoomInformationResourceDto.fromEntities(savedRoom, roomClass);
    }

    async HandleRemoveModuleFromRoom(command: RemoveRoomModuleCommand): Promise<RoomInformationResourceDto> {
        const room: Room = await this.roomRepository.findByIdAsync(command.id);
        if(!room) {
            throw new RoomNotFoundError(command.id);
        }
        const roomClass: RoomClass = await this.roomClassRepository.findByIdAsync(room.roomClassId);
        if(!roomClass) {
            throw new RoomClassNotFoundError(room.roomClassId);
        }
        const updatedRoom: Room = Room.RemoveModule(room, command.module);
        const savedRoom: Room = await this.roomRepository.updateAsync(updatedRoom);
        return RoomInformationResourceDto.fromEntities(savedRoom, roomClass);
    }


    async HandleReserveRoom(roomId:number, nfcKey:string):Promise<Room>{
        const room: Room = await this.roomRepository.findByIdAsync(roomId);
        if(!room) {
            throw new RoomNotFoundError(roomId);
        }
        room.nfcKey = nfcKey;
        room.roomStatus = RoomStatus.RESERVED;
        return this.roomRepository.updateAsync(room);
    }

}
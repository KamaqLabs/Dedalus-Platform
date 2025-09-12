import {IRoomClassCommandService} from "../../../domain/services/room-class-services/i-room-class-command-service";
import {Inject, Injectable} from "@nestjs/common";
import {ROOM_CLASS_REPOSITORY_TOKEN} from "../../../domain/repositories/room-class-repository.token";
import {IRoomClassRepository} from "../../../domain/repositories/i-room-class-repository";
import { CreateRoomClassCommand } from "src/hotel/domain/model/commands/create-room-class.command";
import { DeleteRoomClassCommand } from "src/hotel/domain/model/commands/delete-room-class.command";
import { UpdateRoomClassCommand } from "src/hotel/domain/model/commands/update-room-class.command";
import { RoomClass } from "src/hotel/domain/model/entites/RoomClass";
import {HotelCommandService} from "./hotel-command.service";
import {HotelNotFoundError} from "../../errors/hotel-errors/hotel-not-found.error";
import {RoomClassNotFoundError} from "../../errors/room-class-errors/room-class-not-found.error";
import {RoomClassNameExistisError} from "../../errors/room-class-errors/room-class-name-existis.error";
@Injectable()
export class RoomClassCommandService implements IRoomClassCommandService {
    constructor(
        @Inject(ROOM_CLASS_REPOSITORY_TOKEN)
        private readonly roomClassRepository: IRoomClassRepository<RoomClass>,
        private readonly hotelCommandService: HotelCommandService,
    ) {
    }
    async HandleCreateRoomClass(command: CreateRoomClassCommand, hotelId: number): Promise<RoomClass> {

        if(!(await this.hotelCommandService.HandleIsHotelExists(hotelId))){
            throw new HotelNotFoundError(hotelId);
        }
        if(await this.roomClassRepository.findByClassNameAsync(command.roomClassName)){
            throw new RoomClassNameExistisError(command.roomClassName);
        }
        const newRoomClass: RoomClass =  RoomClass.ConstructRoomClassFromCommand(command, hotelId);
        return this.roomClassRepository.addAsync(newRoomClass);
    }
    async HandleUpdateRoomClass(command: UpdateRoomClassCommand, roomClassId: number): Promise<RoomClass> {

        if(!(await this.roomClassRepository.findByIdAsync(roomClassId))) {
            throw new RoomClassNotFoundError(roomClassId);
        }
        if(await this.roomClassRepository.findByClassNameAsync(command.roomClassName) && (await this.roomClassRepository.findByClassNameAsync(command.roomClassName))?.id !== roomClassId) {
            throw new RoomClassNameExistisError(command.roomClassName);
        }
        const updatedRoomCLass: RoomClass = RoomClass.UpdateRoomClassFromCommand(command, roomClassId);
        return this.roomClassRepository.updateAsync(updatedRoomCLass);
    }
    async HandleDeleteRoomClass(command: DeleteRoomClassCommand): Promise<void> {
        if(!(await this.roomClassRepository.findByIdAsync(command.id))) {
            throw new RoomClassNotFoundError(command.id);
        }
        const roomClassToDelete = await this.roomClassRepository.findByIdAsync(command.id);
        await this.roomClassRepository.deleteAsync(roomClassToDelete);
    }
}
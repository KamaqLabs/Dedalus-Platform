import {CreateRoomClassCommand} from "../../model/commands/create-room-class.command";
import {RoomClass} from "../../model/entites/RoomClass";
import {UpdateRoomClassCommand} from "../../model/commands/update-room-class.command";
import {DeleteRoomClassCommand} from "../../model/commands/delete-room-class.command";

export interface IRoomClassCommandService {
    HandleCreateRoomClass(command: CreateRoomClassCommand, hotelId:number): Promise<RoomClass>;
    HandleUpdateRoomClass(command: UpdateRoomClassCommand, hotelId:number): Promise<RoomClass>;
    HandleDeleteRoomClass(command: DeleteRoomClassCommand): Promise<void>;

}
import {CreateRoomCommand} from "../../model/commands/create-room.command";
import {UpdateRoomCommand} from "../../model/commands/update-room.command";
import {AssignNfcKeyCommand} from "../../model/commands/assign-nfc-key.command";
import {RemoveNfcKeyCommand} from "../../model/commands/remove-nfc-key.command";
import {AddRoomModuleCommand} from "../../model/commands/add-room-module.command";
import {RemoveRoomModuleCommand} from "../../model/commands/remove-room-module.command";
import {RoomInformationResourceDto} from "../../../interfaces/rest/dto/room-information-resource.dto";

export interface IRoomCommandService {
    HandleCreateRoom(command:CreateRoomCommand): Promise<RoomInformationResourceDto>;
    HandleUpdateRoom(command: UpdateRoomCommand): Promise<RoomInformationResourceDto>;
    HandleDeleteRoom(roomId: number): Promise<void>;
    HandleAddNfcKey(command: AssignNfcKeyCommand): Promise<RoomInformationResourceDto>;
    HandleDeleteNfcKey(command: RemoveNfcKeyCommand): Promise<RoomInformationResourceDto>;
    HandleUpdateRoomStatus(roomId: number, status: string): Promise<RoomInformationResourceDto>;
    HandleAddModuleToRoom(command: AddRoomModuleCommand): Promise<RoomInformationResourceDto>;
    HandleRemoveModuleFromRoom(command: RemoveRoomModuleCommand): Promise<RoomInformationResourceDto>;

}

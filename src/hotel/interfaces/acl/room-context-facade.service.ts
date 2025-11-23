import {Inject, Injectable} from "@nestjs/common";
import {RoomCommandService} from "../../application/internal/commandservices/room-command.service";
import {RoomQueryService} from "../../application/internal/queryservices/room-query.service";
import {Room} from "../../domain/model/aggregates/Room";
import {RoomInformationResourceDto} from "../rest/dto/room-information-resource.dto";
import {AssignNfcKeyCommand} from "../../domain/model/commands/assign-nfc-key.command";
import {RemoveNfcKeyCommand} from "../../domain/model/commands/remove-nfc-key.command";

@Injectable()
export class RoomContextFacadeService{

    constructor(
        @Inject()
        private readonly roomCommandService: RoomCommandService,
        @Inject()
        private readonly roomQueryService: RoomQueryService,
    ) {
    }

    public async roomExists(hotelId: number): Promise<boolean> {
        return this.roomQueryService.HandleRoomExists(hotelId);
    }

    public async assingNfcKeyToRoom(roomId: number, nfcKey: string): Promise<void> {
        await this.roomCommandService.HandleAddNfcKey(roomId,nfcKey);
    }

    public async deleteNfcKeyFromRoom(roomId:number): Promise<void>{

        const command: RemoveNfcKeyCommand = new RemoveNfcKeyCommand({id: roomId});
        await this.roomCommandService.HandleDeleteNfcKey(command);
    }

    public async reserveRoom(roomId:number): Promise<Room>{
        return await this.roomCommandService.HandleReserveRoom(roomId);
    }

    public async getPricePerNight(roomId:number): Promise<number>{
        return await this.roomQueryService.HandleGetPricePerNight(roomId);
    }

    public async changeStatusToOccupied(roomId: number): Promise<void> {
        await this.roomCommandService.HandleUpdateRoomStatus(roomId, 'occupied');
    }

    public async changeStatusToMaintenance(roomId: number): Promise<void> {
        await this.roomCommandService.HandleUpdateRoomStatus(roomId, 'maintenance');
    }

    public async changeStatusToAvailable(roomId: number): Promise<void> {
        await this.roomCommandService.HandleUpdateRoomStatus(roomId, 'available');
    }



}
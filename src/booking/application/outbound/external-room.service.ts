import {Inject, Injectable} from "@nestjs/common";
import {RoomContextFacadeService} from "../../../hotel/interfaces/acl/room-context-facade.service";
import {Room} from "../../../hotel/domain/model/aggregates/Room";

@Injectable()
export class ExternalRoomService {
    constructor(
        @Inject()
        private readonly roomContextFacade: RoomContextFacadeService
    ) {
    }

    public async roomExists(roomId: number): Promise<boolean> {
        return this.roomContextFacade.roomExists(roomId);
    }

    public async addNfcKeyToRoom(roomId: number, nfcKey:string): Promise<void> {
        return this.roomContextFacade.assingNfcKeyToRoom(roomId,nfcKey);
    }

    public async reserveRoom(roomId:number): Promise<Room>{
        return this.roomContextFacade.reserveRoom(roomId);
    }

    public async getPricePerNight(roomId:number): Promise<number>{
        return this.roomContextFacade.getPricePerNight(roomId);
    }

    public async changeRoomStatusToOccupied(roomId:number): Promise<void>{

        return await this.roomContextFacade.changeStatusToOccupied(roomId);
    }

    public async changeRoomStatusToMaintenance(roomId:number): Promise<void>{

        return await this.roomContextFacade.changeStatusToMaintenance(roomId);
    }

    public async changeRoomStatusToAvailable(roomId:number): Promise<void>{
        return await this.roomContextFacade.changeStatusToAvailable(roomId);
    }

    public async deleteNfcKeyFromRoom(roomId:number): Promise<void>{
        return await this.roomContextFacade.deleteNfcKeyFromRoom(roomId);
    }

}
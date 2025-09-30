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

    public async reserveRoom(roomId:number, nfcKey:string): Promise<Room>{
        return this.roomContextFacade.reserveRoom(roomId,nfcKey);
    }

    public async getPricePerNight(roomId:number): Promise<number>{
        return this.roomContextFacade.getPricePerNight(roomId);
    }

}
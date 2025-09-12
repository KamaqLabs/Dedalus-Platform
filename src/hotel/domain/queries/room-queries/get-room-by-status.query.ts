import {RoomStatus} from "../../model/valueobjects/RoomStatus";


export class GetRoomByStatusQuery {
    constructor(public readonly status: RoomStatus) {}
}

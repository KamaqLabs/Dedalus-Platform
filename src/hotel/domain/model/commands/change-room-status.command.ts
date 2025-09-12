import { RoomStatus } from "../valueobjects/RoomStatus";

export class ChangeRoomStatusCommand {
    public readonly id: number;
    public readonly newStatus: RoomStatus;

    constructor(data: {
        id: number;
        newStatus: RoomStatus;
    }) {
        this.id = data.id;
        this.newStatus = data.newStatus;
    }
}

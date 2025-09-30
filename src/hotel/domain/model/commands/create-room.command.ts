import { RoomStatus } from "../valueobjects/RoomStatus";

export class CreateRoomCommand {
    public readonly roomNumber: string;
    public readonly floor: number;
    public readonly roomStatus: RoomStatus;
    public readonly roomClassId: number;

    constructor(data: {
        roomNumber: string;
        floor: number;
        roomStatus?: RoomStatus;
        roomClassId: number;
    }) {
        this.roomNumber = data.roomNumber;
        this.floor = data.floor;
        this.roomStatus = data.roomStatus || RoomStatus.AVAILABLE;
        this.roomClassId = data.roomClassId;
    }
}

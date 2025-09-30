import { RoomStatus } from "../valueobjects/RoomStatus";

export class UpdateRoomCommand {
    public readonly roomNumber: string;
    public readonly floor: number;
    public readonly roomClassId: number;

    constructor(data: {
        roomNumber: string;
        floor: number;
        roomClassId: number;
    }) {
        this.roomNumber = data.roomNumber;
        this.floor = data.floor;
        this.roomClassId = data.roomClassId;
    }
}

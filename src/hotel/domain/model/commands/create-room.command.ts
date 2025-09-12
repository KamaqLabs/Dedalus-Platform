import { RoomStatus } from "../valueobjects/RoomStatus";

export class CreateRoomCommand {
    public readonly roomNumber: string;
    public readonly floor: number;
    public readonly nfcKey: string | null;
    public readonly modules: number[];
    public readonly roomStatus: RoomStatus;
    public readonly roomClassId: number;

    constructor(data: {
        roomNumber: string;
        floor: number;
        nfcKey?: string | null;
        modules: number[];
        roomStatus?: RoomStatus;
        roomClassId: number;
    }) {
        this.roomNumber = data.roomNumber;
        this.floor = data.floor;
        this.nfcKey = data.nfcKey || null;
        this.modules = data.modules;
        this.roomStatus = data.roomStatus || RoomStatus.AVAILABLE;
        this.roomClassId = data.roomClassId;
    }
}

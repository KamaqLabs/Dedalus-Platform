import { RoomStatus } from "../valueobjects/RoomStatus";

export class UpdateRoomCommand {
    public readonly id: number;
    public readonly hotelId: number;
    public readonly roomNumber: string;
    public readonly floor: number;
    public readonly nfcKey: string | null;
    public readonly modules: string[];
    public readonly roomStatus: RoomStatus;
    public readonly roomClassId: number;

    constructor(data: {
        id: number;
        hotelId: number;
        roomNumber: string;
        floor: number;
        nfcKey?: string | null;
        modules: string[];
        roomStatus: RoomStatus;
        roomClassId: number;
    }) {
        this.id = data.id;
        this.hotelId = data.hotelId;
        this.roomNumber = data.roomNumber;
        this.floor = data.floor;
        this.nfcKey = data.nfcKey || null;
        this.modules = data.modules;
        this.roomStatus = data.roomStatus;
        this.roomClassId = data.roomClassId;
    }
}

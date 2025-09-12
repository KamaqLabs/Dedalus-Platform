import {RoomClass} from "../../../domain/model/entites/RoomClass";

export class RoomClassInformationDto {
    id: number;
    roomClassName: string;
    maxOccupancy: number;
    defaultPricePerNight: number;
    description: string;

    constructor(roomClass: RoomClass) {
        this.id = roomClass.id;
        this.roomClassName = roomClass.roomClassName;
        this.maxOccupancy = roomClass.maxOccupancy;
        this.defaultPricePerNight = roomClass.defaultPricePerNight;
        this.description = roomClass.description;
    }
}
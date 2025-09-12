export class UpdateRoomClassCommand {
    public readonly roomClassName: string;
    public readonly maxOccupancy: number;
    public readonly defaultPricePerNight: number;
    public readonly description: string;

    constructor(data: {
        roomClassName: string;
        maxOccupancy: number;
        defaultPricePerNight: number;
        description: string;
    }) {
        this.roomClassName = data.roomClassName;
        this.maxOccupancy = data.maxOccupancy;
        this.defaultPricePerNight = data.defaultPricePerNight;
        this.description = data.description;
    }
}

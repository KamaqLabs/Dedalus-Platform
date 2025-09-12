export class DeleteRoomClassCommand {
    public readonly id: number;

    constructor(data: {
        id: number;
    }) {
        this.id = data.id;
    }
}

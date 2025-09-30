export class AddRoomModuleCommand {
    public readonly id: number;
    public readonly module: number;

    constructor(data: {
        id: number;
        module: number;
    }) {
        this.id = data.id;
        this.module = data.module;
    }
}

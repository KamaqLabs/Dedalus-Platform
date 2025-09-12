export class AddRoomModuleCommand {
    public readonly id: number;
    public readonly module: string;

    constructor(data: {
        id: number;
        module: string;
    }) {
        this.id = data.id;
        this.module = data.module;
    }
}

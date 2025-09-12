export class UpdateRoomModulesCommand {
    public readonly id: number;
    public readonly modules: string[];

    constructor(data: {
        id: number;
        modules: string[];
    }) {
        this.id = data.id;
        this.modules = data.modules;
    }
}

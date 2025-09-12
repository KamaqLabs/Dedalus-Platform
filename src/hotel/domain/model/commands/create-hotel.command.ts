export class CreateHotelCommand {
    public readonly name: string;
    public readonly ruc: string;
    public readonly address: string;

    constructor(data: {
        name: string;
        ruc: string;
        address: string;
    }) {
        this.name = data.name;
        this.ruc = data.ruc;
        this.address = data.address;
    }
}
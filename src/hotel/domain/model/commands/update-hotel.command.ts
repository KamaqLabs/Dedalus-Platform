export class UpdateHotelCommand {
    public readonly address: string;
    public readonly name: string;
    public readonly ruc: string;
    constructor(data:{
        address: string;
        name: string;
        ruc: string;
    }) {
        this.address = data.address;
        this.name = data.name;
        this.ruc = data.ruc;
    }
}
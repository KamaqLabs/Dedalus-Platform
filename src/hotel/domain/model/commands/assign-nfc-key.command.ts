export class AssignNfcKeyCommand {
    public readonly id: number;
    public readonly nfcKey: string;

    constructor(data: {
        id: number;
        nfcKey: string;
    }) {
        this.id = data.id;
        this.nfcKey = data.nfcKey;
    }
}

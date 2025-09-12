export class GetRoomClassesByPriceRangeQuery {
    constructor(
        public readonly minPrice: number,
        public readonly maxPrice: number
    ) {}
}


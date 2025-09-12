import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";

export interface IRoomClassRepository<RoomClass> extends IBaseRepository<RoomClass> {
    findByClassNameAsync(className: string): Promise<RoomClass>;
    findByMaxOccupancyAsync(maxOccupancy: number): Promise<RoomClass[]>;
    findByPriceRangeAsync(minPrice: number, maxPrice: number): Promise<RoomClass[]>;
    findByHotelId(hotelId: number): Promise<RoomClass[]>;
    findAll(): Promise<RoomClass[]>;
}
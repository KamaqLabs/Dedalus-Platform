import {IBaseRepository} from "../../../shared/domain/repositories/i-base-repository";


export interface IHotelRepository<Hotel> extends IBaseRepository<Hotel> {
    findByNameAsync(name: string): Promise<Hotel>;
    findByRucAsync(ruc: string): Promise<Hotel>;

    findAllAsync(): Promise<Hotel[]>;
}
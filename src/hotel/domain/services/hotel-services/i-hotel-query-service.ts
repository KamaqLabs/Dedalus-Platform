import {Hotel} from "../../model/aggregates/Hotel";


export interface IHotelQueryService {
    HandleGetHotelById(id: number): Promise<Hotel>;
    HandleGetHotelByName(name: string): Promise<Hotel>;
    HandleGetHotelByRuc(ruc: string): Promise<Hotel>;
    HandleGetAllHotels(): Promise<Hotel[]>;
}
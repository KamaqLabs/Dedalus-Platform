import {IHotelQueryService} from "../../../domain/services/hotel-services/i-hotel-query-service";
import {Inject, Injectable} from "@nestjs/common";
import {HOTEL_REPOSITORY_TOKEN} from "../../../domain/repositories/hotel-repository.token";
import {IHotelRepository} from "../../../domain/repositories/i-hotel-repository";
import {Hotel} from "../../../domain/model/aggregates/Hotel";
import {HotelNotFoundError} from "../../errors/hotel-errors/hotel-not-found.error";



@Injectable()
export class HotelQueryService implements IHotelQueryService {

    constructor(
        @Inject(HOTEL_REPOSITORY_TOKEN)
        private readonly hotelRepository: IHotelRepository<Hotel>
    ) {
    }

    async HandleGetHotelById(id: number): Promise<Hotel> {
        const hotel = await this.hotelRepository.findByIdAsync(id);
        if (!hotel) {
            throw new HotelNotFoundError(id);
        }
        return hotel;
    }
    async HandleGetHotelByName(name: string): Promise<Hotel> {
        if(await this.hotelRepository.findByNameAsync(name)  == null) {
            // throw new HotelNotFoundError(name);
        }
        return this.hotelRepository.findByNameAsync(name);
    }
    async HandleGetHotelByRuc(ruc: string): Promise<Hotel> {
        if(await this.hotelRepository.findByRucAsync(ruc)  == null) {
            // throw new HotelNotFoundError(ruc);
        }
        return this.hotelRepository.findByRucAsync(ruc);
    }
}
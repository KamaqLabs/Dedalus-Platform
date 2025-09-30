import {Inject, Injectable} from "@nestjs/common";
import {HotelCommandService} from "../../application/internal/commandservices/hotel-command.service";
import {HotelQueryService} from "../../application/internal/queryservices/hotel-query.service";

@Injectable()
export class HotelContextFacadeService{

    constructor(
        @Inject()
        private readonly hotelCommandService: HotelCommandService,
        @Inject()
        private readonly hotelQueryService: HotelQueryService
    ) {
    }

    public async hotelExists(hotelId: number): Promise<boolean> {
        return this.hotelCommandService.HandleIsHotelExists(hotelId);
    }



}
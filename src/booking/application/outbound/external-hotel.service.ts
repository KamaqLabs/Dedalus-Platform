import {Inject, Injectable} from "@nestjs/common";
import {HotelContextFacadeService} from "../../../hotel/interfaces/acl/hotel-context-facade.service";



@Injectable()
export class ExternalHotelService {
    constructor(
        @Inject()
        private readonly hotelContextFacade: HotelContextFacadeService
    ) {
    }

    public async hotelExists(hotelId: number): Promise<boolean> {
        return this.hotelContextFacade.hotelExists(hotelId);
    }


}
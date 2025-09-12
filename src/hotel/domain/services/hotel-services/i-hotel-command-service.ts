import {CreateHotelCommand} from "../../model/commands/create-hotel.command";
import {Hotel} from "../../model/aggregates/Hotel";
import {UpdateHotelCommand} from "../../model/commands/update-hotel.command";

export interface IHotelCommandService {
    HandleCreteHotelAsync(command: CreateHotelCommand): Promise<Hotel>;
    HandleUpdateHotelAsync(command: UpdateHotelCommand, hotelId: number): Promise<Hotel>;
    HandleDeleteHotelAsync(hotelId: number): Promise<void>;
    HandleIsHotelExists(hotelId: number): Promise<boolean>
}
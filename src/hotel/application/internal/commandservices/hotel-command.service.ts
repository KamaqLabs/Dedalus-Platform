import {Inject, Injectable} from "@nestjs/common";
import {HOTEL_REPOSITORY_TOKEN} from "../../../domain/repositories/hotel-repository.token";
import {IHotelRepository} from "../../../domain/repositories/i-hotel-repository";
import {HotelRepository} from "../../../infrastrucuture/persistence/typeorm/repositories/HotelRepository";
import {IHotelCommandService} from "../../../domain/services/hotel-services/i-hotel-command-service";
import { Hotel } from "src/hotel/domain/model/aggregates/Hotel";
import { CreateHotelCommand } from "src/hotel/domain/model/commands/create-hotel.command";
import { UpdateHotelCommand } from "src/hotel/domain/model/commands/update-hotel.command";
import {HotelNotFoundError} from "../../errors/hotel-errors/hotel-not-found.error";
import {NameExistsError} from "../../errors/hotel-errors/name-exists.error";
import {RucExistsError} from "../../errors/hotel-errors/ruc-exists.error";

@Injectable()
export class HotelCommandService implements IHotelCommandService {

    constructor(
        @Inject(HOTEL_REPOSITORY_TOKEN)
        private readonly hotelRepository: IHotelRepository<Hotel>
    ) {
    }

    async HandleCreteHotelAsync(command: CreateHotelCommand): Promise<Hotel> {
        const newHotel = Hotel.ConstructHotelFromCommand(command);
        if(await this.hotelRepository.findByNameAsync(command.name)) {
            throw new NameExistsError(newHotel.name);
        }
        if(await this.hotelRepository.findByRucAsync(command.ruc)) {
            throw new RucExistsError(newHotel.ruc);
        }
        return  this.hotelRepository.addAsync(newHotel);
    }

    async HandleUpdateHotelAsync(command: UpdateHotelCommand, hotelId: number): Promise<Hotel> {
        const updatedHotel = Hotel.UpdateHotelFromCommand(command,hotelId);
        if(await this.hotelRepository.findByNameAsync(command.name) || (await this.hotelRepository.findByNameAsync(command.name))?.id !== hotelId) {
            throw new NameExistsError(updatedHotel.name);
        }
        if(await this.hotelRepository.findByRucAsync(command.ruc) || (await this.hotelRepository.findByRucAsync(command.ruc))?.id !== hotelId) {
            throw new RucExistsError(updatedHotel.ruc);
        }
        if(!updatedHotel) throw new HotelNotFoundError(hotelId);

        return this.hotelRepository.updateAsync(updatedHotel);
    }
    async HandleDeleteHotelAsync(hotelId: number): Promise<void> {
        const hotelToDelete = await this.hotelRepository.findByIdAsync(hotelId);
        if(!hotelToDelete) throw new HotelNotFoundError(hotelId);
        await this.hotelRepository.deleteAsync(hotelToDelete);
    }

    async HandleIsHotelExists(hotelId: number): Promise<boolean> {
        const hotel = await this.hotelRepository.findByIdAsync(hotelId);
        return !!hotel;

    }
}
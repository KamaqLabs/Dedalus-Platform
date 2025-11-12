import {Injectable} from "@nestjs/common";
import {Hotel} from "../../../../domain/model/aggregates/Hotel";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {IHotelRepository} from "../../../../domain/repositories/i-hotel-repository";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class HotelRepository extends BaseRepository<Hotel>
    implements IHotelRepository<Hotel>{

    constructor(
        @InjectRepository(Hotel)
         private readonly hotelRepository: Repository<Hotel>
    ) {
        super(hotelRepository);
    }

    findByNameAsync(name: string): Promise<Hotel> {
        return this.hotelRepository.findOne({
            where: { name }
        });
    }

    findByRucAsync(ruc: string): Promise<Hotel> {
        return this.hotelRepository.findOne({
            where: { ruc }
        });
    }

    findAllAsync(): Promise<Hotel[]> {
        return this.hotelRepository.find();
    }





}
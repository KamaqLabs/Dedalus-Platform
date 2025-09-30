import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {RoomClass} from "../../../../domain/model/entites/RoomClass";
import {IRoomClassRepository} from "../../../../domain/repositories/i-room-class-repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";


@Injectable()
export class RoomClassRepository extends BaseRepository<RoomClass>
    implements IRoomClassRepository<RoomClass>  {
    constructor(
        @InjectRepository(RoomClass)
        private readonly roomClassRepository: Repository<RoomClass>
    ) {
        super(roomClassRepository);
    }

    findAll(): Promise<RoomClass[]> {
        return this.roomClassRepository.find();
    }

    async findByClassNameAsync(className: string): Promise<RoomClass> {
        return await this.roomClassRepository.findOne({
            where: { roomClassName: className }
        });
    }

    async findByMaxOccupancyAsync(maxOccupancy: number): Promise<RoomClass[]> {
        return await this.roomClassRepository.find({
            where: { maxOccupancy: maxOccupancy }
        });
    }

    async findByPriceRangeAsync(minPrice: number, maxPrice: number): Promise<RoomClass[]> {
        return await this.roomClassRepository
            .createQueryBuilder('roomClass')
            .where('roomClass.defaultPricePerNight >= :minPrice', { minPrice })
            .andWhere('roomClass.defaultPricePerNight <= :maxPrice', { maxPrice })
            .getMany();
    }

    async findByHotelId(hotelId: number): Promise<RoomClass[]> {
        return await this.roomClassRepository.find({
            where: { hotelId: hotelId }
        });
    }

}
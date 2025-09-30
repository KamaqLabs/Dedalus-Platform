import {Injectable} from "@nestjs/common";
import {BaseRepository} from "../../../../../shared/infrastructure/persistence/typeorm/repositories/base-repository";
import {Room} from "../../../../domain/model/aggregates/Room";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {IRoomRepository} from "../../../../domain/repositories/i-room-repository";
import { RoomStatus } from "src/hotel/domain/model/valueobjects/RoomStatus";


@Injectable()
export class RoomRepository extends BaseRepository<Room>
    implements IRoomRepository<Room> {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {
        super(roomRepository);
    }

    async findByHotelIdAsync(hotelId: number): Promise<Room[]> {
        return await this.roomRepository.find({
            where: { hotelId }
        });
    }

    async findByRoomNumberAsync(roomNumber: string): Promise<Room> {
        return await this.roomRepository.findOne({
            where: { roomNumber }
        });
    }

    async findByFloorAsync(floorNumber: number): Promise<Room[]> {
        return await this.roomRepository.find({
            where: { floor: floorNumber }
        });
    }

    async findByNfcKeyAsync(nfcKey: string): Promise<Room> {
        return await this.roomRepository.findOne({
            where: { nfcKey }
        });
    }

    async findByStatusAsync(status: RoomStatus): Promise<Room[]> {
        return await this.roomRepository.find({
            where: { roomStatus: status }
        });
    }

    async findByRoomClassIdAsync(roomClassId: number): Promise<Room[]> {
        return await this.roomRepository.find({
            where: { roomClassId }
        });
    }

    async findAll(): Promise<Room[]> {
        return this.roomRepository.find();
    }



}
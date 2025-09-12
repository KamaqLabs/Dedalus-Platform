import {Module} from "@nestjs/common";
import {HotelController} from "./interfaces/rest/hotel.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {IamModule} from "../iam/iam.module";
import {CqrsModule} from "@nestjs/cqrs";
import {Hotel} from "./domain/model/aggregates/Hotel";
import {HotelCommandService} from "./application/internal/commandservices/hotel-command.service";
import {HOTEL_REPOSITORY_TOKEN} from "./domain/repositories/hotel-repository.token";
import {HotelQueryService} from "./application/internal/queryservices/hotel-query.service";
import {HotelRepository} from "./infrastrucuture/persistence/typeorm/repositories/HotelRepository";




@Module({
    imports: [TypeOrmModule.forFeature([Hotel]), IamModule, CqrsModule],
    providers: [
        HotelCommandService,
        {
            provide: HOTEL_REPOSITORY_TOKEN,
            useClass: HotelRepository,
        },
        HotelQueryService,
    ],
    exports: [HOTEL_REPOSITORY_TOKEN, HotelCommandService],
    controllers: [HotelController],
})

export class HotelsModule {}
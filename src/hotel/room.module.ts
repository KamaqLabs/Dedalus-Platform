import {forwardRef, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CqrsModule} from "@nestjs/cqrs";
import {HotelsModule} from "./hotels.module";
import {Room} from "./domain/model/aggregates/Room";
import {RoomCommandService} from "./application/internal/commandservices/room-command.service";
import {RoomQueryService} from "./application/internal/queryservices/room-query.service";
import {ROOM_REPOSITORY_TOKEN} from "./domain/repositories/room-repository.token";
import {RoomRepository} from "./infrastructure/persistence/typeorm/repositories/RoomRepository";
import {ROOM_CLASS_REPOSITORY_TOKEN} from "./domain/repositories/room-class-repository.token";
import {RoomClassRepository} from "./infrastructure/persistence/typeorm/repositories/RoomClassRepository";
import {RoomClass} from "./domain/model/entites/RoomClass";
import {RoomController} from "./interfaces/rest/room.controller";
import {RoomContextFacadeService} from "./interfaces/acl/room-context-facade.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Room, RoomClass]),
        CqrsModule,
        forwardRef(() => HotelsModule),
    ],
    providers: [
        RoomCommandService,
        RoomQueryService,
        {
            provide: ROOM_REPOSITORY_TOKEN,
            useClass: RoomRepository,
        },
        {
            provide: ROOM_CLASS_REPOSITORY_TOKEN,
            useClass: RoomClassRepository,
        },
        RoomContextFacadeService
    ],
    controllers: [RoomController],
    exports: [
        ROOM_REPOSITORY_TOKEN,
        ROOM_CLASS_REPOSITORY_TOKEN,
        RoomCommandService,
        RoomQueryService,
        RoomContextFacadeService
    ]
})
export class RoomModule {}
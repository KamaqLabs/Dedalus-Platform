import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RoomClass } from './domain/model/entites/RoomClass';
import { RoomClassController } from './interfaces/rest/room-class.controller';
import { RoomClassCommandService } from './application/internal/commandservices/room-class-command.service';
import { RoomClassQueryService } from './application/internal/queryservices/room-class-query.service';
import { RoomClassRepository } from './infrastrucuture/persistence/typeorm/repositories/RoomClassRepository';
import { ROOM_CLASS_REPOSITORY_TOKEN } from './domain/repositories/room-class-repository.token';
import {HotelsModule} from "./hotels.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([RoomClass]),
        CqrsModule,
        forwardRef(() => HotelsModule),
    ],
    providers: [
        RoomClassCommandService,
        RoomClassQueryService,
        {
            provide: ROOM_CLASS_REPOSITORY_TOKEN,
            useClass: RoomClassRepository,
        }
    ],
    controllers: [RoomClassController],
    exports: [
        ROOM_CLASS_REPOSITORY_TOKEN,
        RoomClassCommandService,
        RoomClassQueryService
    ]
})
export class RoomClassModule {}
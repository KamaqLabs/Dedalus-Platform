import {TypeOrmModule} from "@nestjs/typeorm";
import {Booking} from "./domain/model/aggregates/Booking";
import {HotelsModule} from "../hotel/hotels.module";
import {RoomModule} from "../hotel/room.module";
import {ProfilesModule} from "../profiles/profiles.module";
import {CqrsModule} from "@nestjs/cqrs";
import {BookingCommandService} from "./application/internal/booking-command.service";
import {BookingRepository} from "./infrastructure/persistence/typeorm/repositories/BookingRepository";
import {BOOKING_REPOSITORY_TOKEN} from "./domain/repositories/booking-repository.token";
import {BookingQueryService} from "./application/internal/booking-query.service";
import {BookingController} from "./interfaces/rest/booking.controller";
import {Module} from "@nestjs/common";

import {ExternalHotelService} from "./application/outbound/external-hotel.service";
import {ExternalRoomService} from "./application/outbound/external-room.service";
import {ExternalGuestProfileService} from "./application/outbound/external-guest-profile.service";
import { BookingReminderEventHandler } from "./application/internal/event-handlers/booking-reminder-event-handler.service";
import {ToPeruvianTimeZoneService} from "./application/internal/utils/to-peruvian-time-zone.service";


@Module({
    imports: [TypeOrmModule.forFeature([Booking]), HotelsModule, RoomModule, ProfilesModule, CqrsModule],
    providers: [
        BookingReminderEventHandler,
        BookingCommandService,
        {
            provide: BOOKING_REPOSITORY_TOKEN,
            useClass: BookingRepository,
        },
        BookingQueryService,
        ToPeruvianTimeZoneService,
        ExternalHotelService,
        ExternalGuestProfileService,
        ExternalRoomService
    ],
    exports: [BOOKING_REPOSITORY_TOKEN],
    controllers: [BookingController],
})
export class BookingModule {}
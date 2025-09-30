import {Inject, Injectable, Logger} from "@nestjs/common";
import {BOOKING_REPOSITORY_TOKEN} from "../../../domain/repositories/booking-repository.token";
import {IBookingRepository} from "../../../domain/repositories/i-booking-repository";
import {Booking} from "../../../domain/model/aggregates/Booking";
import {Cron, CronExpression} from "@nestjs/schedule";



@Injectable()
export class BookingReminderEventHandler {
    private readonly logger = new Logger(BookingReminderEventHandler.name);

    constructor(
        @Inject(BOOKING_REPOSITORY_TOKEN)
        private readonly bookingRepository: IBookingRepository<Booking>,
    ) {}

    @Cron(CronExpression.EVERY_30_SECONDS)
    async handleBookingReminder() {
        try {
            const { readyForCheckIn, pendingConfirmation } = await this.bookingRepository
                .findBookingsForStatusUpdate();

            if (readyForCheckIn.length > 0) {
                const checkInIds = readyForCheckIn.map(b => b.id);
                await this.bookingRepository.updateBookingsToCheckedInWithRoomStatus(checkInIds);
                this.logger.log(`✅ ${readyForCheckIn.length} bookings cambiados a CHECKED_IN y rooms a OCCUPIED: [${checkInIds.join(', ')}]`);
            }

            if (pendingConfirmation.length > 0) {
                const confirmIds = pendingConfirmation.map(b => b.id);
                await this.bookingRepository.updateBookingsToConfirmed(confirmIds);
            }
            if (readyForCheckIn.length === 0 && pendingConfirmation.length === 0) {
                this.logger.debug('No hay bookings para procesar');
            }

            this.logger.log(`Procesados: ${readyForCheckIn.length} check-ins, ${pendingConfirmation.length} confirmaciones`);

        } catch (error) {
            this.logger.error('Error procesando actualizaciones', error);
        }
    }

}
import {Injectable, Logger} from "@nestjs/common";
import {Cron, CronExpression} from "@nestjs/schedule";
import {BookingCommandService} from "../booking-command.service";
import {BookingQueryService} from "../booking-query.service";
import {RoomStatus} from "../../../../hotel/domain/model/valueobjects/RoomStatus";


@Injectable()
export class BookingReminderEventHandler {
    private readonly logger = new Logger(BookingReminderEventHandler.name);

    constructor(
        private readonly bookingQueryService: BookingQueryService,
        private readonly bookingCommandService: BookingCommandService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async handleBookingReminder() {
        try {
            const { readyForCheckIn, pendingConfirmation, readyForCheckOut } = await this.bookingQueryService.findBookingsForStatusUpdate();

            if (readyForCheckIn.length > 0) {
                const checkInIds = readyForCheckIn.map(b => b.id);

                for(const bookingId of checkInIds){
                    await this.bookingCommandService.HandleCheckInBookingAsync(bookingId);
                }
                //await this.bookingRepository.updateBookingsToCheckedInWithRoomStatus(checkInIds);
                this.logger.log(`✅ ${readyForCheckIn.length} bookings cambiados a CHECKED_IN y rooms a OCCUPIED: [${checkInIds.join(', ')}]`);
            }

            if (pendingConfirmation.length > 0) {
                const confirmIds = pendingConfirmation.map(b => b.id);

                for(const bookingId of confirmIds){
                    await this.bookingCommandService.HandleConfirmBookingAsync(bookingId);
                }
                //await this.bookingRepository.updateBookingsToConfirmed(confirmIds);
                this.logger.log( `✔️ ${pendingConfirmation.length} bookings cambiados a CONFIRMED: [${confirmIds.join(', ')}]`);
            }
            if (readyForCheckOut && readyForCheckOut.length > 0) {
                const checkOutIds = readyForCheckOut.map(b => b.id);

                for(const bookingId of checkOutIds){
                    await this.bookingCommandService.HandleCheckOutBookingAsync(bookingId);
                }
                //await this.bookingRepository.updateBookingsToCheckedOutWithRoomStatus(checkOutIds);

                this.logger.log(`🏁 ${readyForCheckOut.length} bookings cambiados a CHECKED_OUT y rooms a Maintenance: [${checkOutIds.join(', ')}]`);
            }

            if (readyForCheckIn.length === 0 && pendingConfirmation.length === 0 && readyForCheckOut.length === 0) {
                this.logger.debug('No hay bookings para procesar');
            }

            this.logger.log(`Procesados: ${readyForCheckIn.length} check-ins, ${pendingConfirmation.length} confirmaciones, ${readyForCheckOut.length} check-outs.`);

        } catch (error) {
            this.logger.error('Error procesando actualizaciones', error);
        }
    }

/*    @Cron(CronExpression.EVERY_HOUR)
    async handleRoomMaintenanceRelease() {
        const now = new Date();
        const status: RoomStatus = RoomStatus.AVAILABLE;
        const maintenanceRooms = await this.bookingQueryService.findBookingsByStatusAsync(status);
        const maintenanceDurationMs = 2 * 60 * 60 * 1000; // 2 horas

        for (const room of maintenanceRooms) {
            if (room.updatedAt && (now.getTime() - new Date(room.updatedAt).getTime()) >= maintenanceDurationMs) {
                //await this.roomCommandService.HandleUpdateRoomStatus(room.id, 'available');
                this.logger.log(`Room ${room.id} liberada de mantenimiento`);
            }
        }
    }*/
}
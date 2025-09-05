import {Booking} from "../model/aggregates/Booking";
import {BookStatus} from "../model/valueObjects/BookStatus";

export interface IBookingQueryService {
    // Consultas básicas
    findBookingByIdAsync(bookingId: number): Promise<Booking | null>;
    findAllBookingsByHotelIdAsync(hotelId: number): Promise<Booking[]>;
    findBookingsByGuestIdAsync(guestId: number): Promise<Booking[]>;
    findBookingsByStatusAsync(status: BookStatus): Promise<Booking[]>;
    findBookingsByDateRangeAsync(startDate: Date, endDate: Date): Promise<Booking[]>;

    // Consultas avanzadas
    findActiveBookingsByHotelIdAsync(hotelId: number): Promise<Booking[]>;
    findBookingsByCheckInDateAsync(checkInDate: Date): Promise<Booking[]>;
    findBookingsByCheckOutDateAsync(checkOutDate: Date): Promise<Booking[]>;
    findBookingsByNfcKeyAsync(nfcKey: string): Promise<Booking | null>;
    findOverlappingBookingsAsync(guestId: number, checkIn: Date, checkOut: Date): Promise<Booking[]>;

    // Consultas estadísticas
    countBookingsByStatusAsync(hotelId: number, status: BookStatus): Promise<number>;
    countTotalBookingsByHotelAsync(hotelId: number): Promise<number>;
    calculateTotalRevenueByHotelAsync(hotelId: number): Promise<number>;
    calculateRevenueByDateRangeAsync(hotelId: number, startDate: Date, endDate: Date): Promise<number>;
    getAverageBookingDurationAsync(hotelId: number): Promise<number>;

    // Consultas de ocupación
    findAvailableDatesAsync(hotelId: number, startDate: Date, endDate: Date): Promise<Date[]>;
    getOccupancyRateAsync(hotelId: number, date: Date): Promise<number>;
    findUpcomingCheckInsAsync(hotelId: number, date: Date): Promise<Booking[]>;
    findUpcomingCheckOutsAsync(hotelId: number, date: Date): Promise<Booking[]>;

    // Consultas de huéspedes
    findBookingHistoryByGuestAsync(guestId: number): Promise<Booking[]>;
    findCurrentBookingByGuestAsync(guestId: number): Promise<Booking | null>;
    findFrequentGuestsAsync(hotelId: number, minBookings: number): Promise<{guestId: number, bookingCount: number}[]>;

    // Consultas de reportes
    getMonthlyBookingReportAsync(hotelId: number, year: number, month: number): Promise<{totalBookings: number, totalRevenue: number, averageStay: number}>;
    getNoShowBookingsAsync(hotelId: number, date: Date): Promise<Booking[]>;
    getLastMinuteBookingsAsync(hotelId: number, hours: number): Promise<Booking[]>;
    findExpiredPendingBookingsAsync(hotelId: number, expirationHours: number): Promise<Booking[]>;
}

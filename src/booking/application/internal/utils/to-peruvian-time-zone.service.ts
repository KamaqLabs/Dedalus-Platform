import { Injectable } from '@nestjs/common';

@Injectable()
export class ToPeruvianTimeZoneService {
    private readonly PERU_TIMEZONE = 'America/Lima';

    /**
     * Convierte una fecha a zona horaria peruana
     */
    toPeruvianTime(date: Date): Date {
        return new Date(date.toLocaleString("en-US", { timeZone: this.PERU_TIMEZONE }));
    }

    /**
     * Obtiene la fecha/hora actual en zona peruana
     */
    getCurrentPeruvianTime(): Date {
        return this.toPeruvianTime(new Date());
    }

    /**
     * Convierte un string ISO a fecha peruana
     */
    fromISOToPeruvianTime(isoString: string): Date {
        return this.toPeruvianTime(new Date(isoString));
    }

    /**
     * Calcula diferencia en minutos entre dos fechas en zona peruana
     */
    getMinutesDifference(date1: Date, date2: Date): number {
        const peruDate1 = this.toPeruvianTime(date1);
        const peruDate2 = this.toPeruvianTime(date2);
        return (peruDate1.getTime() - peruDate2.getTime()) / (1000 * 60);
    }

    /**
     * Verifica si una fecha ya pasó en zona peruana
     */
    hasDatePassed(date: Date): boolean {
        const now = this.getCurrentPeruvianTime();
        const targetDate = this.toPeruvianTime(date);
        return targetDate <= now;
    }

    /**
     * Formatea fecha peruana a string ISO
     */
    toPeruvianISOString(date: Date): string {
        return this.toPeruvianTime(date).toISOString();
    }
}
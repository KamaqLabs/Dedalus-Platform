import { IsNumber, IsNotEmpty, Min, IsDateString, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {CreateBookCommand} from "../../../domain/model/commands/create-book.command";

export class CreateBookResourceDto {

    @ApiProperty({
        description: 'ID del huésped que realizará la reserva',
        example: 1,
        minimum: 1,
        type: Number
    })
    @IsNumber({}, { message: 'El ID del huésped debe ser un número' })
    @Min(1, { message: 'El ID del huésped debe ser mayor o igual a 1' })
    @IsNotEmpty({ message: 'El ID del huésped no puede estar vacío' })
    guestId: number;

    @ApiProperty({
        description: 'ID de la habitación a reservar',
        example: 1,
        minimum: 1,
        type: Number
    })
    @IsNumber({}, { message: 'El ID de la habitación debe ser un número' })
    @Min(1, { message: 'El ID de la habitación debe ser mayor o igual a 1' })
    @IsNotEmpty({ message: 'El ID de la habitación no puede estar vacío' })
    roomId: number;

    @ApiProperty({
        description: 'Fecha de entrada (check-in) en formato ISO. **IMPORTANTE: Enviar en hora peruana (UTC-5)**',
        example: '2025-09-15T14:00:00-05:00',
        type: String,
        format: 'date-time'
    })
    @IsDateString({}, { message: 'La fecha de entrada debe tener formato ISO válido' })
    @IsNotEmpty({ message: 'La fecha de entrada no puede estar vacía' })
    checkInDate: string;

    @ApiProperty({
        description: 'Fecha de salida (check-out) en formato ISO. **IMPORTANTE: Enviar en hora peruana (UTC-5)**',
        example: '2025-09-20T12:00:00-05:00', //
        type: String,
        format: 'date-time'
    })
    @IsDateString({}, { message: 'La fecha de salida debe tener formato ISO válido' })
    @IsNotEmpty({ message: 'La fecha de salida no puede estar vacía' })
    checkOutDate: string;




    toCommand(): CreateBookCommand {
        return new CreateBookCommand({
            guestId: this.guestId,
            roomId: this.roomId,
            checkInDate: new Date(this.checkInDate),
            checkOutDate: new Date(this.checkOutDate)
        });
    }

}
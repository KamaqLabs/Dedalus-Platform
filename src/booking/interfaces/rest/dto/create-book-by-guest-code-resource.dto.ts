import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";
import {CreateBookCommand} from "../../../domain/model/commands/create-book.command";
import {CreateBookByGuestCodeCommand} from "../../../domain/model/commands/create-book-by-guest-code.command";

export class CreateBookByGuestCodeResourceDto{
    @ApiProperty({
        description: 'Codigo  del huésped que realizará la reserva',
        example: 1,
        minimum: 1,
        type: String
    })
    @IsNotEmpty({ message: 'El código del huésped no puede estar vacío' })
    @IsString({ message: 'El código del huésped debe ser una cadena de texto' })
    guestCode: string;

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




    toCommand(): CreateBookByGuestCodeCommand {
        return new CreateBookByGuestCodeCommand({
            guestCode: this.guestCode,
            roomId: this.roomId,
            checkInDate: new Date(this.checkInDate),
            checkOutDate: new Date(this.checkOutDate)
        });
    }
}
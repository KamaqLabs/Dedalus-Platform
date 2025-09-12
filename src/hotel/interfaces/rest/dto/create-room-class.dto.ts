import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, MaxLength, Min, Max, Matches, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomClassDto {
    @ApiProperty({
        description: 'Nombre de la clase de habitación',
        example: 'Suite Presidencial',
        minLength: 1,
        maxLength: 100
    })
    @IsNotEmpty({ message: 'El nombre de la clase de habitación es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
    @Matches(/^[\w\sÀ-ÿ.,'()-]+$/u, {
        message: 'El nombre de la clase contiene caracteres inválidos'
    })
    roomClassName: string;

    @ApiProperty({
        description: 'Ocupación máxima de la habitación',
        example: 4,
        minimum: 1,
        maximum: 10
    })
    @IsNotEmpty({ message: 'La ocupación máxima es obligatoria' })
    @IsNumber({}, { message: 'La ocupación máxima debe ser un número' })
    @Type(() => Number)
    @IsPositive({ message: 'La ocupación máxima debe ser un número positivo' })
    @Min(1, { message: 'La ocupación mínima debe ser 1 persona' })
    @Max(10, { message: 'La ocupación máxima no puede exceder 10 personas' })
    maxOccupancy: number;

    @ApiProperty({
        description: 'Precio por defecto por noche en soles',
        example: 250.50,
        minimum: 0.01
    })
    @IsNotEmpty({ message: 'El precio por noche es obligatorio' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número con máximo 2 decimales' })
    @Type(() => Number)
    @IsPositive({ message: 'El precio debe ser un número positivo' })
    @Min(0.01, { message: 'El precio mínimo debe ser S/. 0.01' })
    defaultPricePerNight: number;

    @ApiProperty({
        description: 'Descripción de la clase de habitación',
        example: 'Habitación de lujo con vista al mar, jacuzzi privado y sala de estar',
        maxLength: 500
    })
    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @MaxLength(500, { message: 'La descripción no puede exceder los 500 caracteres' })
    @Matches(/^[\w\sÀ-ÿ0-9.,'#\-()]+$/u, {
        message: 'La descripción contiene caracteres inválidos'
    })
    description: string;

    constructor(roomClassName: string, maxOccupancy: number, defaultPricePerNight: number, description: string) {
        this.roomClassName = roomClassName;
        this.maxOccupancy = maxOccupancy;
        this.defaultPricePerNight = defaultPricePerNight;
        this.description = description;
    }
}
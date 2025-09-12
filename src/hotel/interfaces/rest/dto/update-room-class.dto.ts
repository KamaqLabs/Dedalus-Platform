import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, MaxLength, Min, Max, Matches } from 'class-validator';

export class UpdateRoomClassDto {
    @ApiProperty({
        description: 'Nombre de la clase de habitación',
        example: 'Suite Ejecutiva',
        maxLength: 100
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @Matches(/^[\w\sÀ-ÿ.,''-]+$/u, {
        message: 'El nombre de la clase de habitación contiene caracteres inválidos'
    })
    roomClassName: string;

    @ApiProperty({
        description: 'Ocupación máxima de la habitación',
        example: 4,
        minimum: 1,
        maximum: 10
    })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(10)
    maxOccupancy: number;

    @ApiProperty({
        description: 'Precio por defecto por noche',
        example: 250.00,
        minimum: 0.01
    })
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    @Min(0.01)
    defaultPricePerNight: number;

    @ApiProperty({
        description: 'Descripción de la clase de habitación',
        example: 'Suite ejecutiva con vista al mar, incluye desayuno y wifi gratuito',
        maxLength: 500
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    description: string;

    constructor(roomClassName: string, maxOccupancy: number, defaultPricePerNight: number, description: string) {
        this.roomClassName = roomClassName;
        this.maxOccupancy = maxOccupancy;
        this.defaultPricePerNight = defaultPricePerNight;
        this.description = description;
    }
}
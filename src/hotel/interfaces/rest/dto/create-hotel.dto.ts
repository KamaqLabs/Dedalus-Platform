import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumberString, IsString, Length, Matches, MaxLength} from 'class-validator';

export class CreateHotelDto {
    @ApiProperty({
        description: 'El nombre del hotel',
        example: 'Hotel Lima Palace',
        minLength: 1,
        maxLength: 100
    })
    @Length(1, 100)
    @Matches(/^[\w\sÀ-ÿ.,'-]+$/u,{
        message: 'El nombre del hotel contiene caracteres inválidos'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: 'RUC del hotel (11 dígitos)',
        example: '20123456789',
        pattern: '^[0-9]{11}$',
        minLength: 11,
        maxLength: 11
    })
    @IsNotEmpty()
    @IsString()
    @IsNumberString()
    @Length(11, 11)
    @Matches(/^[0-9]{11}$/, {
        message: 'El RUC debe contener exactamente 11 dígitos numéricos'
    })
    ruc: string;

    @ApiProperty({
        description: 'Dirección del hotel',
        example: 'Av. Javier Prado Este 1234, San Isidro, Lima',
        maxLength: 200
    })
    @Matches(/^[\w\sÀ-ÿ0-9.,'#\-]+$/u, {
        message: 'La dirección contiene caracteres inválidos'
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    address: string;



    constructor(name: string, ruc: string, address: string) {
        this.name = name;
        this.ruc = ruc;
        this.address = address;
    }
}
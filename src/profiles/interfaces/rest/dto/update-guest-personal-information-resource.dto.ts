import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateGuestPersonalInformationResourceDto {

    @ApiProperty({
        description: 'Guest Name',
        example: 'Juan',
        minLength: 2,
        maxLength: 50
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, { message: 'El nombre solo puede contener letras y espacios' })
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Guest LastName',
        example: 'Pérez',
        minLength: 2,
        maxLength: 50
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, { message: 'El apellido solo puede contener letras y espacios' })
    @MinLength(2)
    @MaxLength(50)
    lastName: string;

    @ApiProperty({
        description: 'Dni',
        example: '12345678',
        minLength: 8,
        maxLength: 12
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 12)
    @Matches(/^[0-9]+$/, { message: 'DNI debe contener solo 8 números' })
    dni: string;

    @ApiProperty({
        description: 'Correo electrónico del huésped',
        example: 'juan.perez@email.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Número de teléfono',
        example: '+51987654321',
        minLength: 9,
        maxLength: 15
    })
    @IsNotEmpty()
    @IsString()
    @Length(9, 15)
    @Matches(/^[\+]?[0-9\s\-\(\)]+$/, { message: 'Formato de teléfono inválido' })
    phoneNumber: string;
}
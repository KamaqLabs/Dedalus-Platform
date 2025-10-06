import {
    IsDate,
    IsDateString,
    IsEmail, IsIn,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateGuestProfileResourceDto {

    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'juanperez123',
        minLength: 3,
        maxLength: 30
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username solo puede contener letras, números y guiones bajos' })
    username: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Password123!',
        minLength: 8,
        maxLength: 50
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'Password debe tener al menos una mayúscula, una minúscula, un número y un carácter especial' })
    password: string;

    @ApiProperty({
        description: 'Guest Name',
        example: 'Juan',
        minLength: 2,
        maxLength: 50
    })
    @IsNotEmpty()
    @IsString()
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
    @MinLength(2)
    @MaxLength(50)
    lastName: string;

    @ApiProperty({
        description: 'Dni',
        example: '12345678',
        minLength: 8,
        maxLength: 8
    })
    @IsNotEmpty()
    @IsString()
    @Length(8, 12)
    @Matches(/^[0-9]+$/, { message: 'DNI debe contener solo números' })
    dni: string;

    @ApiProperty({
        description: 'Correo electrónico del adminstrador',
        example: 'juan.perez@email.com'
    })
    @IsNotEmpty()
    @IsString({
        message: "El correo electrónico debe ser una cadena de texto"
    })
    @IsEmail(undefined, { message: 'El correo electrónico debe ser válido.' })
    email: string;



    @ApiProperty({
        description: 'Número de teléfono',
        example: '+51987654321',
        minLength: 9,
        maxLength: 15
    })
    @IsNotEmpty()
    @IsString({
        message: "El numero de telefono debe ser una cadena de texto"
    })
    @Length(9, 15)
    @Matches(/^[\+]?[0-9\s\-\(\)]+$/, { message: 'Formato de teléfono inválido' })
    phoneNumber: string;

}
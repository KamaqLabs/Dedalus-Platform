import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class CreateAdministratorProfileResourceDto {
    @ApiProperty({
        example: 'admin123',
        description: 'Username único para el administrador'
    })
    @IsString({ message: 'El username debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El username no puede estar vacío' })
    username: string;

    @ApiProperty({
        example: 'Password123!',
        description: 'Contraseña del administrador (mínimo 6 caracteres)'
    })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiProperty({
        example: 'Juan Carlos',
        description: 'Nombre del administrador'
    })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    name: string;

    @ApiProperty({
        example: 'García López',
        description: 'Apellido del administrador'
    })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
    lastName: string;

    @ApiProperty({
        example: '12345678',
        description: 'DNI del administrador (8 dígitos)'
    })
    @IsString({ message: 'El DNI debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
    dni: string;

    @ApiProperty({
        example: 'admin@hotel.com',
        description: 'Email del administrador'
    })
    @IsEmail({}, { message: 'Debe ser un email válido' })
    @IsNotEmpty({ message: 'El email no puede estar vacío' })
    email: string;

    @ApiProperty({
        example: '+51987654321',
        description: 'Número de teléfono del administrador'
    })
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    phoneNumber: string;
}
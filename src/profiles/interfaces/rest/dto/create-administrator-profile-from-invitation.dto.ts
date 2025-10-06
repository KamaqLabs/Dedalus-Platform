import {
    IsNotEmpty,
    IsString,
    Length,
    Matches,
    MaxLength,
    MinLength
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAdministratorProfileFromInvitationDto {

    @IsString()
    @IsNotEmpty({ message: 'El nombre de usuario no puede estar vacío.' })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres.' })
    @MaxLength(20, { message: 'El nombre de usuario no debe exceder los 20 caracteres.' })
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'El nombre de usuario no puede tener tildes, ñ, espacios ni caracteres especiales. Solo usa letras, números y guiones bajos.' })
    @ApiProperty({ description: 'El nombre de usuario del usuario' })
    username: string;


    @IsString()
    @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    @MaxLength(50, { message: 'La contraseña no debe exceder los 50 caracteres.' })
    @Matches(/^[a-zA-Z0-9_]+$/, { message: 'La contraseña no puede tener tildes, ñ, espacios ni caracteres especiales. Solo usa letras, números y guiones bajos.' })
    @ApiProperty({ description: 'La contraseña del usuario' })
    password: string;

    @IsString({
        message: "El nombre debe ser una cadena de texto"
    })
    @ApiProperty({ description: 'El nombre del usuario' })
    name: string;

    @IsString({
        message: "El apellido debe ser una cadena de texto"
    })
    @ApiProperty({ description: 'El apellido del usuario' })
    lastName: string;

    @IsString()
    @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres.' })
    @ApiProperty({ description: 'El DNI del usuario' })
    dni: string;

/*    @IsString({
        message: "El correo electrónico debe ser una cadena de texto"
    })
    @IsEmail(undefined, { message: 'El correo electrónico debe ser válido.' })
    @ApiProperty({ description: 'El correo electrónico del usuario' })
    email: string;*/


    @ApiProperty({
        example: '+51987654321',
        description: 'Número de teléfono del administrador'
    })
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
    phoneNumber: string;


    @ApiProperty({ description: 'El token de invitación del usuario' })
    @IsString({ message: 'El token de invitación debe ser una cadena de texto' })
    invitationToken: string;




}
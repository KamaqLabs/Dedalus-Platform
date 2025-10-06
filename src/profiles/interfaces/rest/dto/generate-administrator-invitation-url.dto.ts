import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class GenerateAdministratorInvitationUrl {
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
}
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomResourceDto {


    @ApiProperty({
        description: 'Número de la habitación',
        example: 'A101',
        type: String
    })
    @IsString({ message: 'El número de habitación debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El número de habitación no puede estar vacío' })
    roomNumber: string;

    @ApiProperty({
        description: 'Piso donde se encuentra la habitación',
        example: 1,
        minimum: 1,
        type: Number
    })
    @IsNumber({}, { message: 'El piso debe ser un número' })
    @Min(1, { message: 'El piso debe ser mayor o igual a 1' })
    floor: number;


    @ApiProperty({
        description: 'ID de la clase de habitación',
        example: 1,
        minimum: 1,
        type: Number
    })
    @IsNumber({}, { message: 'El ID de la clase de habitación debe ser un número' })
    @Min(1, { message: 'El ID de la clase de habitación debe ser mayor o igual a 1' })
    roomClassId: number;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {

  @IsString()
  @IsNotEmpty({ message: 'Username cannot be empty.' })
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters.' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain alphanumeric characters and underscores.' })
  @ApiProperty({ description: 'The user’s username' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters.' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain alphanumeric characters and underscores.' })
  @ApiProperty({ description: 'The user’s password' })
  password: string;

  @IsString()
  @ApiProperty({ description: 'The user’s role' })
  rol: string;

  constructor(data?: {username: string; password: string; rol: string}) {
    if(data) {
      this.username = data.username;
      this.password = data.password;
      this.rol = data.rol;
    }
  }
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {

  @IsString()
  @ApiProperty({ description: 'The user’s username' })
  username: string;

  @ApiProperty({ description: 'The user’s password' })
  @IsString()
  password: string;

  constructor(data?: { username: string; password: string }) {
    if(data) {
      this.username = data.username;
      this.password = data.password;
    }
  }
}
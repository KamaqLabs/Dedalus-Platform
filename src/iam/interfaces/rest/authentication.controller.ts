import {
  Body,
  Controller,
  Param,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountCommandService } from '../../application/internal/command-services/account-command.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInCommand } from '../../domain/model/commands/sign-in.command';
import { AuthenticatedUserDto } from './dto/authenticated-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { IamApplicationExceptionFilter } from '../filters/iam-application-exception.filter';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenCommand } from '../../domain/model/commands/refresh-token.command';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ChangePasswordCommand } from '../../domain/model/commands/change-password.command';
import { Roles } from '../../../shared/infrastructure/auth/roles.decorator';
import { JwtAuthGuard } from '../../../shared/infrastructure/auth/jwt-auth.guard';
import { RolesGuard } from '../../../shared/infrastructure/auth/roles.guard';
import { Request, Response } from 'express';
import * as process from 'node:process';
import { RefreshedTokenDto } from './dto/refreshed-token.dto';
import { RememberIdentityInformationCommand } from '../../domain/model/commands/remember-identity-information.command';
import { LogoutCommand } from '../../domain/model/commands/logout.command';

@ApiBearerAuth()
@ApiTags('IAM')
@Controller('api/v1/authentication')
@UseFilters(IamApplicationExceptionFilter)
export class AuthenticationController {
  constructor(
    private readonly accountCommandService: AccountCommandService
  ) { }

  @ApiOperation({
    summary: 'Allows users to sign in',
    description: 'This endpoint allows users to sign in to the application',
  })
  @UsePipes(new ValidationPipe())
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res ({ passthrough: true }) response:Response): Promise<any> {
    const isProd = process.env.NODE_ENV === 'production';

    const signInCommand = new SignInCommand(signInDto);
    const signedInInformation = await this.accountCommandService.handleSignIn(signInCommand);
    const authenticatedUser = new AuthenticatedUserDto(signedInInformation);

    // Clear any existing cookies before setting new ones
    response.clearCookie('token', { path: '/' });
    response.clearCookie('refreshToken', { path: '/' });

    response.cookie('token', authenticatedUser.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    })

    response.cookie('refreshToken', authenticatedUser.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/'
    })

    if(!isProd) {
      return authenticatedUser
    }
    else {
      return {
        profileId: authenticatedUser.profileId,
        username: authenticatedUser.username,
        rol: authenticatedUser.rol
      }
    }
  }

  @ApiOperation({
    summary: 'Allows users to refresh their token',
    description: 'This endpoint allows users to refresh their token',
  })
@UsePipes(new ValidationPipe())
@Post('refresh-token')
  async refreshToken(@Req() request: Request, @Res({ passthrough: true }) response: Response): Promise<RefreshedTokenDto | string> {
    const isProd = process.env.NODE_ENV === 'production';
    const refreshToken = request.cookies.refreshToken;

    const refreshTokenCommand = new RefreshTokenCommand(refreshToken);
    const token = await this.accountCommandService.handleRefreshToken(refreshTokenCommand);
    const refreshedTokenDto = new RefreshedTokenDto(token);

    response.clearCookie('token', { path: '/' });
    response.clearCookie('refreshToken', { path: '/' });

    response.cookie('token', refreshedTokenDto.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/'
    })

    response.cookie('refreshToken', refreshedTokenDto.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    if(!isProd) {
      return refreshedTokenDto;
    }
    else {
      return 'Token refreshed successfully';
    }

  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Allows the admin to update the password of an account',
    description: 'This endpoint allows the admin to update the password of an account',
  })
  @Post('/account/:id/update-password')
   async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto, @Param('id') accountId: number): Promise<string> {
    const updatePasswordCommand = new ChangePasswordCommand(accountId, updatePasswordDto.newPassword);
    await this.accountCommandService.handleChangePassword(updatePasswordCommand);
    return 'Password updated successfully';
  }

  @ApiOperation({
    summary: 'Allows users to remember information',
    description: 'This endpoint allows users to remember information',
  })
  @UsePipes(new ValidationPipe())
  @Post('me')
  async rememberMyInformation(@Req() request: Request): Promise<{ id: number, username: string, rol: string }> {
    const isProd = process.env.NODE_ENV === 'production';
    let token: string | undefined;


    if(isProd) {
      token = request.cookies.token;
    }
    else {
      const authHeader  = request.headers.authorization;
      if(authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
      else {
        token = request.cookies.token;
      }
    }

    const command = new RememberIdentityInformationCommand(token);
    return await this.accountCommandService.handleRememberIdentity(command);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Allows users to logout',
    description: 'This endpoint allows users to logout from the application and clears their authentication cookies',
  })
  @ApiParam({
    name: 'id',
    description: 'The account ID of the user to logout',
    type: 'number',
    example: 1
  })
  @Post('logout/account/:id')
  async logout(@Param('id') id: number, @Res({ passthrough: true }) response: Response): Promise<string> {
    const isProd = process.env.NODE_ENV === 'production';

    const logoutCommand = new LogoutCommand(id);
    await this.accountCommandService.handleLogout(logoutCommand);

    response.clearCookie('token', {
      path: '/',
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax'
    });
    response.clearCookie('refreshToken', {
      path: '/',
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax'
    });

    return 'Logout successful';
  }
}

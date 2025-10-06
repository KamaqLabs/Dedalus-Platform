import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Query, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {ProfileApplicationExceptionFilter} from "../filters/profile-application-exception.filter";
import {
    AdministratorProfileCommandService
} from "../../application/internal/commandservices/administrator-Profile-command.service";
import {
    AdministratorProfileQueryService
} from "../../application/internal/queryservices/administrator-profile-query.service";
import {ValidateInvitationTokenCommand} from "../../../iam/domain/model/commands/validate-invitation-token.command";
import {GenerateAdministratorInvitationUrl} from "./dto/generate-administrator-invitation-url.dto";
import {
    GenerateAdministratorRegisterInvitationCommand
} from "../../domain/model/commands/generate-administrator-register-invitation.command";
import {
    CreateAdministratorProfileFromInvitationDto
} from "./dto/create-administrator-profile-from-invitation.dto";
import {AdministratorProfileResourceDto} from "./dto/administrator-profile-resource.dto";
import {
    CreateAdministratorProfileFromInvitationCommand
} from "../../domain/model/commands/create-administrator-profile-from-invitation.command";
import {AdministratorProfileFromInvitationResourceDto} from "./dto/administrator-profile-from-invitation-resource.dto";


@ApiBearerAuth()
@ApiTags('Profiles')
@Controller('api/v1/profiles')
@UseFilters(ProfileApplicationExceptionFilter)
export class AdministratorInvitationController{

    constructor(
        private readonly AdministratorProfileCommandService: AdministratorProfileCommandService,
        private readonly administratorProfileQueryService: AdministratorProfileQueryService,
    ) {
    }

    @ApiQuery({ name: 'token', required: true, type: String })
    @ApiResponse({ status: 200, description: 'Returns a message indicating if the token is correct'})
    @ApiOperation({
        summary: 'Verify invitation token',
        description: 'This endpoint verifies the invitation token and returns a message indicating if the token is correct',
    })
    @Get('athlete-profiles/invitations/verify')
    async validateTokenInvitation( @Query('token') token: string) : Promise<string> {
        const validateTokenCommand
            = new ValidateInvitationTokenCommand(token);

        return await this.administratorProfileQueryService
            .handleGetInvitationTokenVerification(validateTokenCommand);
    }


    //@UseGuards(JwtAuthGuard, RolesGuard)   alch no lo usamos por ahora
   // @Roles('ADMIN')
    @UsePipes(new ValidationPipe())
    @Post('athlete-profiles/invitations')
    @ApiOperation({
        summary: 'Generate Administrators invitation URL',
        description: 'This endpoint generates an invitation URL for Administrators to register',
    })
    async createInvitationUrl( @Body() generateAdministratorInvitationUrlDto: GenerateAdministratorInvitationUrl) : Promise<string> {
        const generateAthleteInvitationUrlCommand
            = new GenerateAdministratorRegisterInvitationCommand(generateAdministratorInvitationUrlDto.email);

        return await this.AdministratorProfileCommandService.HandleGenerateAdministratorRegisterInvitation(generateAthleteInvitationUrlCommand);
    }


    @UsePipes(new ValidationPipe())
    @ApiOperation({
        summary: 'Allows the invited Administrators to create an account',
        description: 'This endpoint allows the invited an new Admin to create an account',
    })
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    @Post('administrator-profiles/invitations/accept/:hotelId')
    async createAthleteProfileFromInvitation(
        @Body() createAthleteProfileFromInvitationDto: CreateAdministratorProfileFromInvitationDto,
        @Param('hotelId') hotelId: number
    ) : Promise<AdministratorProfileResourceDto> {
        const createAthleteProfileFromInvitationCommand = new CreateAdministratorProfileFromInvitationCommand(createAthleteProfileFromInvitationDto);
        const administratorProfileResource
            = await this.AdministratorProfileCommandService
            .handleCreateAdministratorProfileFromInvitation(createAthleteProfileFromInvitationCommand,hotelId);

        if(administratorProfileResource) return new AdministratorProfileFromInvitationResourceDto({
            id: administratorProfileResource.administratorProfile.id,
            name: administratorProfileResource.administratorProfile.name,
            lastName: administratorProfileResource.administratorProfile.lastName,
            username : administratorProfileResource.username,
            dni: administratorProfileResource.administratorProfile.dni,
            phoneNumber: administratorProfileResource.administratorProfile.phoneNumber,
            hotelId: administratorProfileResource.administratorProfile.hotelId,
            email: administratorProfileResource.administratorProfile.email,
            accountId: administratorProfileResource.administratorProfile.accountId,
            createdAt: administratorProfileResource.administratorProfile.createdAt,
            updatedAt: administratorProfileResource.administratorProfile.updatedAt
        });
    }

}
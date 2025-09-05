import {GuestProfileCommandService} from "../../application/internal/commandservices/guest-profile-command.service";
import {GuestProfileQueryService} from "../../application/internal/queryservices/guest-profile-query.service";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {GuestProfileResourceDto} from "./dto/guest-profile-resoruce.dto";
import {GetGuestProfileByIdQuery} from "../../domain/model/queries/get-guest-profile-by-id.query";
import {JwtAuthGuard} from "../../../shared/infrastructure/auth/jwt-auth.guard";
import {CreateGuestProfileResourceDto} from "./dto/create-guest-profile-resource.dto";
import {CreateGuestProfileCommand} from "../../domain/model/commands/create-guest-profile.command";
import {UpdateGuestPersonalInformationResourceDto} from "./dto/update-guest-personal-information-resource.dto";
import {
    UpdateGuestPersonalInformationCommand
} from "../../domain/model/commands/update-guest-personal-information.command";


@ApiBearerAuth()
@ApiTags('Profiles')
@Controller('api/v1/profiles/guest-profiles')
export class GuestProfileController {
    constructor(
      private readonly guestProfileCommandService: GuestProfileCommandService,
      private readonly guestProfileQueryService: GuestProfileQueryService
    ) {}


    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Get an Guest profile by id',
        description: 'This endpoint returns an Guest profile by id',
    })
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async GetGuestProfileById(@Param('id') id: number):Promise<GuestProfileResourceDto> {

        const query = new GetGuestProfileByIdQuery(id);
        const guestProfile = await this.guestProfileQueryService.HandleGetGuestProfileById(query);

        return new GuestProfileResourceDto({
            id: guestProfile.guestProfile.id,
            accountId: guestProfile.guestProfile.accountId,
            name: guestProfile.guestProfile.name,
            lastName: guestProfile.guestProfile.lastName,
            dni: guestProfile.guestProfile.dni,
            email: guestProfile.guestProfile.email,
            phoneNumber: guestProfile.guestProfile.phoneNumber,
            status: guestProfile.guestProfile.status,
            nfcKey: guestProfile.guestProfile.nfcKey,
            guestCode: guestProfile.guestProfile.guestCode,
            createdAt: guestProfile.guestProfile.createdAt,
            updatedAt: guestProfile.guestProfile.updatedAt,
            username: guestProfile.username
        })
    }


    @ApiOperation({
        summary: 'Creates an Guest profile',
        description: 'This endpoint creates an Guest profile',
    })
    @Post()
    async CreateGuestProfile(@Body() createGuestProfileDto: CreateGuestProfileResourceDto):Promise<GuestProfileResourceDto> {
        const createGuestProfileCommand = new CreateGuestProfileCommand(createGuestProfileDto);
        const result = await this.guestProfileCommandService.HandleCreateGuestProfile(createGuestProfileCommand);

        return new GuestProfileResourceDto({
            id: result.guestProfile.id,
            accountId: result.guestProfile.accountId,
            name: result.guestProfile.name,
            lastName: result.guestProfile.lastName,
            dni: result.guestProfile.dni,
            email: result.guestProfile.email,
            phoneNumber: result.guestProfile.phoneNumber,
            status: result.guestProfile.status,
            nfcKey: result.guestProfile.nfcKey,
            guestCode: result.guestProfile.guestCode,
            createdAt: result.guestProfile.createdAt,
            updatedAt: result.guestProfile.updatedAt,
            username: result.username
        })
    }

    @ApiOperation({
        summary: 'Updates an Guest profile by id',
        description: 'This endpoint updates an Guest profile',
    })
    @Put(':id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async UpdateGuestProfile(@Body() updateGuestPersonalInformationResourceDto: UpdateGuestPersonalInformationResourceDto,
                             @Param('id') id: number
                             ): Promise<GuestProfileResourceDto> {
        const command = new UpdateGuestPersonalInformationCommand(updateGuestPersonalInformationResourceDto);
        const updatedGuestProfile = await this.guestProfileCommandService.HandleUpdateGuestPersonalInformation(command,id );
        return new GuestProfileResourceDto({
            id: updatedGuestProfile.guestProfile.id,
            accountId: updatedGuestProfile.guestProfile.accountId,
            name: updatedGuestProfile.guestProfile.name,
            lastName: updatedGuestProfile.guestProfile.lastName,
            dni: updatedGuestProfile.guestProfile.dni,
            email: updatedGuestProfile.guestProfile.email,
            phoneNumber: updatedGuestProfile.guestProfile.phoneNumber,
            status: updatedGuestProfile.guestProfile.status,
            nfcKey: updatedGuestProfile.guestProfile.nfcKey,
            guestCode: updatedGuestProfile.guestProfile.guestCode,
            createdAt: updatedGuestProfile.guestProfile.createdAt,
            updatedAt: updatedGuestProfile.guestProfile.updatedAt,
            username: updatedGuestProfile.username
        });

    }





}
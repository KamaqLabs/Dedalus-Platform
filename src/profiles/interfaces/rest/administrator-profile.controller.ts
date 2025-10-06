import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post, Put, UseFilters, UsePipes, ValidationPipe} from "@nestjs/common";
import {ProfileApplicationExceptionFilter} from "../filters/profile-application-exception.filter";
import {
    AdministratorProfileQueryService
} from "../../application/internal/queryservices/administrator-profile-query.service";
import {
    AdministratorProfileCommandService
} from "../../application/internal/commandservices/administrator-Profile-command.service";
import {AdministratorProfileResourceDto} from "./dto/administrator-profile-resource.dto";
import {GetAdministratorProfileByIdQuery} from "../../domain/model/queries/get-administrator-profile-by-id.query";
import {AdministratorProfile} from "../../domain/model/aggregates/Administrator-profile";
import {CreateAdministratorProfileCommand} from "../../domain/model/commands/create-administrator-profile.command";
import {IamApplicationExceptionFilter} from "../../../iam/interfaces/filters/iam-application-exception.filter";
import {CreateAdministratorProfileResourceDto} from "./dto/create-administrator-profile-resource.dto";
import {
    UpdateAdministratorPersonalInformationCommand
} from "../../domain/model/commands/update-administrator-personal-information.command";


@ApiBearerAuth()
@UseFilters(ProfileApplicationExceptionFilter)
@UseFilters(IamApplicationExceptionFilter)
@ApiTags('Profiles')
@Controller('api/v1/profile/administrator-profiles')
export class AdministratorProfileController {

    constructor(
        readonly administratorProfileCommandService: AdministratorProfileCommandService,
        readonly administratorProfileQueryService: AdministratorProfileQueryService
    ) {
    }

    @ApiOperation({
        summary: 'Get an Administrator profile by id',
        description: 'This endpoint returns an Administrator profile by id',
    })
    @Get(':administratorId')
    @ApiParam({ name: 'administratorId', required: true, type: Number, example: 1 })
    @UsePipes(new ValidationPipe())
    async GetAdministratorProfileById(@Param('administratorId') administratorId: number):Promise<AdministratorProfileResourceDto> {
        const query = new  GetAdministratorProfileByIdQuery(administratorId);
        const administratorProfile:AdministratorProfile = await this.administratorProfileQueryService.HandleGetAdministratorProfileById(query);
        return new AdministratorProfileResourceDto(administratorProfile);
    }

    @ApiOperation({
        summary: 'Update an Administrator profile by id',
        description: 'This endpoint updates an Administrator profile by id',
    })
    @Put(':administratorId')
    @ApiParam({ name: 'administratorId', required: true, type: Number, example: 1 })
    @UsePipes(new ValidationPipe())
    async UpdateAdministratorProfileById(@Body() updateAdministratorProfileDto: CreateAdministratorProfileResourceDto,
        @Param('administratorId') administratorId: number):Promise<AdministratorProfileResourceDto> {
        const command = new  UpdateAdministratorPersonalInformationCommand(updateAdministratorProfileDto);
        const administratorProfile:AdministratorProfile = await this.administratorProfileCommandService.HandleUpdateAdministratorPersonalInformation(command,administratorId);
        return new AdministratorProfileResourceDto(administratorProfile);
    }

    @ApiOperation({
        summary: 'Get an Administrator profile by accountId',
        description: 'This endpoint returns an Administrator profile by accountId',
    })
    @Get('by-account/:accountId')
    @ApiParam({ name: 'accountId', required: true, type: Number, example: 1 })
    @UsePipes(new ValidationPipe())
    async GetAdministratorProfileByAccountId(@Param('accountId') accountId: number):Promise<AdministratorProfileResourceDto> {
        const administratorProfile:AdministratorProfile = await this.administratorProfileQueryService.HandleGetAdministratorProfileByAccountId(accountId);
        return new AdministratorProfileResourceDto(administratorProfile);
    }


    @ApiOperation({
        summary: 'Creates an Administrator profile',
        description: 'This endpoint creates an Administrator profile',})
    @Post(':hotelId')
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    @UsePipes(new ValidationPipe())
    async CreateAdministratorProfile(@Body() createAdministratorProfileDto: CreateAdministratorProfileResourceDto,
        @Param('hotelId') hotelId: number):Promise<AdministratorProfileResourceDto> {
        const command = new  CreateAdministratorProfileCommand(createAdministratorProfileDto);
        const administratorProfile:AdministratorProfile = await this.administratorProfileCommandService.HandleCreateAdministratorProfile(command,hotelId);
        return new AdministratorProfileResourceDto(administratorProfile);
    }



}
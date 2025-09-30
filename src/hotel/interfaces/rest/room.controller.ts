import {RoomCommandService} from "../../application/internal/commandservices/room-command.service";
import {RoomQueryService} from "../../application/internal/queryservices/room-query.service";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import {RoomInformationResourceDto} from "./dto/room-information-resource.dto";
import {CreateRoomResourceDto} from "./dto/create-room-resource.dto";
import {CreateRoomCommand} from "../../domain/model/commands/create-room.command";
import {GetRoomByNfcKeyQuery} from "../../domain/queries/room-queries/get-room-by-nfc-key.query";
import {GetRoomByHotelIdQuery} from "../../domain/queries/room-queries/get-room-by-hotel-id.query";
import {UpdateRoomCommand} from "../../domain/model/commands/update-room.command";
import {RoomApplicationExceptionFilter} from "../filters/room-application-exception.filter";


@ApiBearerAuth()
@ApiTags('Rooms')
@UseFilters(RoomApplicationExceptionFilter)
@Controller('api/v1/Hotel/Rooms')
export class RoomController{
    constructor(
        private readonly roomCommandService: RoomCommandService,
        private readonly roomQueryService: RoomQueryService
    ) {
    }

    @ApiOperation({
        summary: 'Get a Room by id',
        description: 'This endpoint returns a Room by id',
    })
    @ApiParam({ name: 'roomId', required: true, type: Number, example: 1 })
    @Get(':roomId')
    async GetRoomById(@Param('roomId', ParseIntPipe) roomId: number):Promise<RoomInformationResourceDto> {
        return this.roomQueryService.HandleGetRoomById(roomId);

    }


    @ApiOperation({
        summary: 'Get Rooms by Hotel id',
        description: 'This endpoint returns all Rooms by Hotel id',
    })
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    @Get('ByHotel/:hotelId')
    async GetRoomsByHotelId(@Param('hotelId', ParseIntPipe) hotelId: number):Promise<RoomInformationResourceDto[]> {
        return this.roomQueryService.HandleGetRoomsByHotelId({hotelId});
    }

    @ApiOperation({
        summary: 'Update a Room',
        description: 'This endpoint updates a Room',
    })
    @ApiParam({ name: 'roomId', required: true, type: Number, example: 1 })
    @UsePipes(new ValidationPipe())
    @Put(':roomId')
    async UpdateRoom(
        @Body() updateRoomDto: CreateRoomResourceDto
        ,@Param('roomId', ParseIntPipe) roomId: number): Promise<RoomInformationResourceDto> {
        const command = new UpdateRoomCommand(updateRoomDto);
        return this.roomCommandService.HandleUpdateRoom(command, roomId);

    }


    @ApiOperation({
        summary: 'Create a Room',
        description: 'This endpoint creates a Room',
    })
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    @UsePipes(new ValidationPipe())
    @Post(':hotelId')
    async CreateRoom(@Body() createRoomResourceDto: CreateRoomResourceDto,
                     @Param ('hotelId', ParseIntPipe,) hotelId: number
    ):Promise<RoomInformationResourceDto> {
        const command= new  CreateRoomCommand(createRoomResourceDto);
        return this.roomCommandService.HandleCreateRoom(command, hotelId);


    }

    @ApiOperation({
        summary: 'Delete a Room',
        description: 'This endpoint deletes a Room by id',
    })
    @ApiParam({ name: 'roomId', required: true, type: Number, example: 1 })
    @Delete('Delete/:roomId')
    async DeleteRoom(@Param('roomId', ParseIntPipe) roomId: number): Promise<void> {
        return this.roomCommandService.HandleDeleteRoom(roomId);
    }


}
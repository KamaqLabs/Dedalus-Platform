import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {
    Body,
    Controller, Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseFilters,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";

import {RoomClassCommandService} from "../../application/internal/commandservices/room-class-command.service";
import {RoomClass} from "../../domain/model/entites/RoomClass";
import {GetRoomClassByIdQuery} from "../../domain/queries/room-class-queries/get-room-class-by-id.query";
import {GetRoomClassesByHotelIdQuery} from "../../domain/queries/room-class-queries/get-room-classes-by-hotel-id.query";
import {RoomClassQueryService} from "../../application/internal/queryservices/room-class-query.service";
import {CreateRoomClassDto} from "./dto/create-room-class.dto";
import {CreateRoomClassCommand} from "../../domain/model/commands/create-room-class.command";
import {UpdateRoomClassDto} from "./dto/update-room-class.dto";
import {UpdateRoomClassCommand} from "../../domain/model/commands/update-room-class.command";
import {DeleteRoomClassCommand} from "../../domain/model/commands/delete-room-class.command";
import {RoomClassApplicationExceptionFilter} from "../filters/room-class-application-exception.filter";
import {HotelApplicationExceptionFilter} from "../filters/hotel-application-exeption.filter";


@ApiBearerAuth()
@ApiTags('RoomClasses')
@UseFilters(RoomClassApplicationExceptionFilter)
@UseFilters(HotelApplicationExceptionFilter)
@Controller('api/v1/Hotels/Room/RoomClasses')
export class RoomClassController{
    constructor(
        private readonly roomClassCommandService: RoomClassCommandService,
        private readonly roomClassQueryService: RoomClassQueryService,
    ) {
    }

    @ApiOperation({
        summary: 'Get a RoomClass by id',
        description: 'This endpoint returns a RoomClass by id',
    })
    @UsePipes(new ValidationPipe())
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async GetRoomClassById(@Param('id', ParseIntPipe) id: number): Promise<RoomClass> {
        const query = new GetRoomClassByIdQuery(id);
        return this.roomClassQueryService.HandleGetRoomClassById(query);
    }


    @ApiOperation({
        summary: 'Get RoomClasses by Hotel id',
        description: 'This endpoint returns RoomClasses by Hotel id',
    })
    @Get('ByHotelId/:hotelId')
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    async GetRoomClassesByHotelId(@Param('hotelId', ParseIntPipe) hotelId: number): Promise<RoomClass[]> {
        const query = new GetRoomClassesByHotelIdQuery(hotelId);
        return this.roomClassQueryService.HandleGetRoomClassesByHotelId(query);
    }

    @ApiOperation({
        summary: 'Creates a RoomClass for a specific Hotel',
        description: 'This endpoint creates a RoomClass for a specific Hotel',
    })
    @UsePipes(new ValidationPipe())
    @Post(':hotelId')
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    async CreateRoomClass(
        @Body() createRoomClassDto: CreateRoomClassDto,
        @Param('hotelId', ParseIntPipe) hotelId: number
    ): Promise<RoomClass> {
        const command = new CreateRoomClassCommand(createRoomClassDto);
        return await this.roomClassCommandService.HandleCreateRoomClass(command, hotelId);
    }


    @ApiOperation({
        summary: 'Updates a RoomClass by id',
        description: 'This endpoint updates a RoomClass by id',
    })
    @UsePipes(new ValidationPipe())
    @Put(':roomClassId')
    @ApiParam({ name: 'roomClassId', required: true, type: Number, example: 1 })
    async UpdateRoomClass(
        @Body() updateRoomClassDto: UpdateRoomClassDto,
        @Param('roomClassId', ParseIntPipe) roomClassId: number ):Promise<RoomClass>{
        const command = new UpdateRoomClassCommand(updateRoomClassDto);
        return this.roomClassCommandService.HandleUpdateRoomClass(command,roomClassId);
    }


    @ApiOperation({
        summary: 'Deletes a RoomClass by id',
        description: 'This endpoint deletes a RoomClass by id',
    })
    @UsePipes(new ValidationPipe())
    @Delete('delete/:id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async DeleteRoomClass(@Param('id', ParseIntPipe) id: number): Promise<void> {
        const command = new DeleteRoomClassCommand({id});
        return this.roomClassCommandService.HandleDeleteRoomClass(command);
    }

}
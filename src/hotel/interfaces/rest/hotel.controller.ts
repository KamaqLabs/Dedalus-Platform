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
import {HotelCommandService} from "../../application/internal/commandservices/hotel-command.service";
import {HotelQueryService} from "../../application/internal/queryservices/hotel-query.service";
import {Hotel} from "../../domain/model/aggregates/Hotel";
import {CreateHotelDto} from "./dto/create-hotel.dto";
import {CreateHotelCommand} from "../../domain/model/commands/create-hotel.command";
import {UpdateHotelCommand} from "../../domain/model/commands/update-hotel.command";
import {HotelApplicationExceptionFilter} from "../filters/hotel-application-exeption.filter";


@ApiBearerAuth()
@ApiTags('Hotels')
@UseFilters(HotelApplicationExceptionFilter)
@Controller('api/v1/Hotel/Hotels')
export class HotelController {
    constructor(
        private readonly hotelCommandService: HotelCommandService,
        private readonly hotelQueryService: HotelQueryService
    ) {
    }

    @ApiOperation({
        summary: 'Get an Hotel by id',
        description: 'This endpoint returns an Hotel by id',
    })
    @UsePipes(new ValidationPipe())
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async GetHotelById(@Param('id',ParseIntPipe) id: number):Promise<Hotel> {
        return this.hotelQueryService.HandleGetHotelById(id);
    }

    async GetHotelByName(@Param('name') name: string):Promise<Hotel> {
        return this.hotelQueryService.HandleGetHotelByName(name);
    }

    async GetHotelByRuc(@Param('ruc') ruc: string):Promise<Hotel> {
        return this.hotelQueryService.HandleGetHotelByRuc(ruc);
    }

    @ApiOperation({
        summary: 'Creates an Hotel',
        description: 'This endpoint creates an Hotel',
    })
    @UsePipes(new ValidationPipe())
    @Post()
    async CreateHotel(@Body() createHotelDto: CreateHotelDto):Promise<Hotel>{
        const command = new CreateHotelCommand(createHotelDto);
        return this.hotelCommandService.HandleCreteHotelAsync(command);

    }

    @ApiOperation({
        summary: 'Updates an Hotel',
        description: 'This endpoint updates an Hotel',
    })
    @UsePipes(new ValidationPipe())
    @Put(':id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async UpdateHotel( @Body() createHotelDto: CreateHotelDto, @Param('id') id:number): Promise<Hotel> {
        const command = new UpdateHotelCommand(createHotelDto);
        return this.hotelCommandService.HandleUpdateHotelAsync(command, id);

    }


    @ApiOperation({
        summary: 'Deletes an Hotel',
        description: 'This endpoint deletes an Hotel',
    })
    @UsePipes(new ValidationPipe())
    @Delete('delete/:id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async DeleteHotel(@Param('id') id: number): Promise<void> {
        return this.hotelCommandService.HandleDeleteHotelAsync(id);
    }

    @ApiOperation({
        summary: 'Check if Hotel exists by id',
        description: 'This endpoint checks if a Hotel exists by its id',
    })
    @UsePipes(new ValidationPipe())
    @Get('exists/:id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async CheckHotelExists(@Param('id') id: number): Promise<boolean> {
        return this.hotelCommandService.HandleIsHotelExists(id);
    }
}
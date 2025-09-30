import {ApiOperation, ApiParam} from "@nestjs/swagger";
import {BookingQueryService} from "../../application/internal/booking-query.service";
import {BookingCommandService} from "../../application/internal/booking-command.service";
import {Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {Booking} from "../../domain/model/aggregates/Booking";
import {CreateBookCommand} from "../../domain/model/commands/create-book.command";
import {BookInformationResourceDto} from "./dto/book-information-resource.dto";
import {CreateBookResourceDto} from "./dto/create-book-resource.dto";

@Controller('api/v1/Booking/Bookings')
export class BookingController {
    constructor(
        private readonly bookingCommandService: BookingCommandService,
        private readonly bookingQueryService: BookingQueryService
    ) {
    }

    @ApiOperation({
        summary: 'Get a Booking by id',
        description: 'This endpoint returns a Booking by id',
    })
    @UsePipes(new ValidationPipe())
    @Get(':id')
    @ApiParam({ name: 'id', required: true, type: Number, example: 1 })
    async GetBookingById(@Param('id',ParseIntPipe) id: number):Promise<Booking> {
        return this.bookingQueryService.findBookingByIdAsync(id);
    }


    @ApiOperation({
        summary: 'Creates a Booking',
        description: 'This endpoint creates a Booking',
    })
    @UsePipes(new ValidationPipe())
    @Post(':hotelId')
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    async CreateBooking(
                 @Body() createBookingDto: CreateBookResourceDto,
                 @Param('hotelId',ParseIntPipe) hotelId: number
    ):Promise<BookInformationResourceDto>{
        const command = createBookingDto.toCommand()
        return this.bookingCommandService.HandleCreateBookingAsync(command,hotelId);
    }
}
import {ApiBearerAuth, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {BookingQueryService} from "../../application/internal/booking-query.service";
import {BookingCommandService} from "../../application/internal/booking-command.service";
import {Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe} from "@nestjs/common";
import {Booking} from "../../domain/model/aggregates/Booking";
import {CreateBookCommand} from "../../domain/model/commands/create-book.command";
import {BookInformationResourceDto} from "./dto/book-information-resource.dto";
import {CreateBookResourceDto} from "./dto/create-book-resource.dto";
import {CreateBookByGuestCodeResourceDto} from "./dto/create-book-by-guest-code-resource.dto";


@ApiBearerAuth()
@ApiTags('Bookings')
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
        summary: 'Get all Bookings',
        description: 'This endpoint returns all Bookings',
    })
    @UsePipes(new ValidationPipe())
    @Get()
    async GetAllBookings():Promise<Booking[]> {
        return this.bookingQueryService.findAllBookingsAsync();
    }


    @ApiOperation({
        summary: 'Get all Bookings by Hotel Id',
        description: 'This endpoint returns all Bookings by Hotel Id',
    })
    @UsePipes(new ValidationPipe())
    @Get('ByHotelId/:hotelId')
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    async GetBookingsByHotelId(@Param('hotelId',ParseIntPipe) hotelId: number):Promise<Booking[]> {
        return this.bookingQueryService.findAllBookingsByHotelIdAsync(hotelId);
    }


    @ApiOperation({
        summary: 'Get all Bookings by Guest Id',
        description: 'This endpoint returns all Bookings by Guest Id',
    })
    @UsePipes(new ValidationPipe())
    @Get('ByGuestId/:guestId')
    @ApiParam({ name: 'guestId', required: true, type: Number, example: 1 })
    async GetBookingsByGuestId(@Param('guestId',ParseIntPipe) guestId: number):Promise<Booking[]> {
        return this.bookingQueryService.findBookingsByGuestIdAsync(guestId);
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



    @ApiOperation({
        summary: 'Creates a Booking by Guest Code',
        description: 'This endpoint creates a Booking by Guest Code',
    })
    @UsePipes(new ValidationPipe())
    @Post('ByGuestCode/:hotelId')
    @ApiParam({ name: 'hotelId', required: true, type: Number, example: 1 })
    async CreateBookingByGuestCode(
        @Body() createBookingByGuestCodeDto: CreateBookByGuestCodeResourceDto,
        @Param('hotelId',ParseIntPipe) hotelId: number
    ):Promise<BookInformationResourceDto>{

        const command = createBookingByGuestCodeDto.toCommand()
        return this.bookingCommandService.HandleCreateBookingByGuestCodeAsync(command,hotelId);
    }
}
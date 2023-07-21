import { Trip } from "@app/domain/trip";
import { PagingResult } from "@app/types";
import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

import { CreateTripDto } from "./dto/create-trip.dto";
import { FilterTripDto } from "./dto/filter-trip.dto";
import { FinishTripDto } from "./dto/finish-trip.dto";
import { TripService } from "./trip.service";

@Controller("/trips")
@ApiTags("Trips")
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new trip" })
  @ApiExtraModels(CreateTripDto)
  @ApiBody({ type: CreateTripDto })
  @ApiCreatedResponse({ description: "The created trip", type: Trip })
  async createTrip(@Body() trip: CreateTripDto): Promise<Trip> {
    const tripCreated = await this.tripService.createTrip(trip);
    return tripCreated;
  }

  @Get()
  @ApiOperation({ summary: "Get a list of trips" })
  @ApiQuery({ type: FilterTripDto })
  @ApiOkResponse({ description: "The list of trips", type: PagingResult<Trip> })
  async getTrips(@Query() filters: FilterTripDto): Promise<PagingResult<Trip>> {
    return this.tripService.getTrips(filters);
  }

  @Get("/:tripId")
  @ApiOperation({ summary: "Get a trip by ID" })
  @ApiParam({ name: "tripId", type: Number })
  @ApiOkResponse({ description: "The trip", type: Trip })
  async getTripById(@Param("tripId", ParseIntPipe) tripId: number): Promise<Trip> {
    return this.tripService.getTripById(tripId);
  }

  @Put("/:tripId/finish")
  @ApiOperation({ summary: "finish a trip by with the posibility to change the final geolocation" })
  @ApiParam({ name: "tripId", type: Number })
  @ApiBody({ type: FinishTripDto })
  @ApiOkResponse({ description: "The trip was updated successfully", type: Trip })
  async finishTrip(@Param("tripId", ParseIntPipe) tripId: number, @Body() props: FinishTripDto): Promise<Trip> {
    await this.tripService.finishTrip(tripId, props);
    return this.tripService.getTripById(tripId);
  }
}

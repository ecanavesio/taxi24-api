import { Passenger } from "@app/domain/passenger";
import { PagingResult } from "@app/types/paging";
import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

import { CreatePassengerDto } from "./dto/create-passenger.dto";
import { FilterPassengerDto } from "./dto/filter-passenger.dto";
import { UpdatePassengerDto } from "./dto/update-passenger.dto";
import { PassengerService } from "./passenger.service";

@Controller("/passengers")
@ApiTags("Passengers")
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new passenger" })
  @ApiCreatedResponse({ description: "The created passenger", type: Passenger })
  async createPassenger(@Body() passenger: CreatePassengerDto): Promise<Passenger> {
    const passengerCreated = await this.passengerService.createPassenger(passenger);
    return passengerCreated;
  }

  @Get()
  @ApiOperation({ summary: "Get a list of passengers" })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ApiOkResponse({ description: "The list of passengers", type: PagingResult })
  async getPassengers(@Query() filters: FilterPassengerDto): Promise<PagingResult<Passenger>> {
    return this.passengerService.getPassengers(filters);
  }

  @Get("/:passengerId")
  @ApiOperation({ summary: "Get a passenger by ID" })
  @ApiParam({ name: "passengerId", type: Number })
  @ApiOkResponse({ description: "The passenger", type: Passenger })
  async getPassengerById(@Param("passengerId", ParseIntPipe) passengerId: number): Promise<Passenger> {
    return this.passengerService.getPassengerById(passengerId);
  }

  @Put("/:passengerId")
  @HttpCode(204)
  @ApiOperation({ summary: "Update a passenger by ID" })
  @ApiParam({ name: "passengerId", type: Number })
  @ApiBody({ type: UpdatePassengerDto })
  @ApiNoContentResponse({ description: "The passenger was updated successfully" })
  async updatePassenger(@Param("passengerId", ParseIntPipe) passengerId: number, @Body() props: UpdatePassengerDto): Promise<void> {
    await this.passengerService.updatePassenger(passengerId, props);
  }
}

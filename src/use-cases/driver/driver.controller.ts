import { Driver } from "@app/domain/driver";
import { PagingResult } from "@app/types";
import { Body, Controller, Get, Param, Post, ParseIntPipe, Query, Put, HttpCode } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse, ApiCreatedResponse, ApiNoContentResponse, ApiBody, ApiParam } from "@nestjs/swagger";

import { DriverService } from "./driver.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { FilterDriversDto } from "./dto/filter-drivers.dto";
import { NewGeolocationDto } from "./dto/new-geolocation.dto";

@Controller("/drivers")
@ApiTags("Drivers")
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: "Create a new driver" })
  @ApiCreatedResponse({ description: "The created driver", type: Driver })
  async createDriver(@Body() driver: CreateDriverDto): Promise<Driver> {
    return this.driverService.createDriver(driver);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of drivers with filters" })
  @ApiOkResponse({ description: "The list of drivers", type: PagingResult<Driver> })
  async getDrivers(@Query() filters: FilterDriversDto): Promise<PagingResult<Driver>> {
    return this.driverService.getDrivers(filters);
  }

  @Get("/:driverId")
  @ApiOperation({ summary: "Get a driver by ID" })
  @ApiParam({ name: "driverId", type: Number })
  @ApiResponse({ description: "The driver", type: Driver })
  async getDriverById(@Param("driverId", ParseIntPipe) driverId: number): Promise<Driver> {
    return this.driverService.getDriverById(driverId);
  }

  @Put("/:driverId/geolocation")
  @HttpCode(204)
  @ApiOperation({ summary: "Update the geolocation of a driver" })
  @ApiParam({ name: "driverId", type: Number })
  @ApiBody({ type: NewGeolocationDto })
  @ApiNoContentResponse({ description: "The geolocation was updated successfully" })
  async updateGeolocation(@Param("driverId", ParseIntPipe) driverId: number, @Body() geolocation: NewGeolocationDto): Promise<void> {
    await this.driverService.updateGeolocation(driverId, geolocation);
  }
}

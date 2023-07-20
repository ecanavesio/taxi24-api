import { Driver } from "@app/domain/driver";
import { PagingResult } from "@app/types/paging";
import { Body, Controller, Get, Param, Post, ParseIntPipe, Query, Res, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiOkResponse } from "@nestjs/swagger";
import { Response } from "express";

import { DriverService } from "./driver.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { FilterDriversDto } from "./dto/filter-drivers.dto";
import { NewGeolocationDto } from "./dto/new-geolocation.dto";

@Controller("/drivers")
@ApiTags("Drivers")
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  @ApiOperation({ summary: "Create a new driver" })
  @ApiResponse({ status: 201, description: "The created driver", type: Driver })
  async createDriver(@Body() driver: CreateDriverDto, @Res() response: Response): Promise<Driver> {
    const driverCreated = await this.driverService.createDriver(driver);
    response.status(201);
    return driverCreated;
  }

  @Get()
  @ApiOperation({ summary: "Get a list of drivers with filters" })
  @ApiOkResponse({ status: 200, description: "The list of drivers", type: PagingResult<Driver> })
  async getDrivers(@Query() filters: FilterDriversDto): Promise<PagingResult<Driver>> {
    return this.driverService.getDrivers(filters);
  }

  @Get("/:driverId")
  @ApiOperation({ summary: "Get a driver by id" })
  @ApiResponse({ status: 200, description: "The driver entity", type: Driver })
  async getDriverById(@Param("driverId", ParseIntPipe) driverId: number): Promise<Driver> {
    return this.driverService.getDriverById(driverId);
  }

  @Put("/:driverId/geolocation")
  @ApiOperation({ summary: "Update geolocation of a driver" })
  @ApiResponse({ status: 204, description: "It finish" })
  async updateGeolocation(
    @Param("driverId", ParseIntPipe) driverId: number,
    @Body() geolocation: NewGeolocationDto,
    @Res() response: Response,
  ): Promise<void> {
    await this.driverService.updateGeolocation(driverId, geolocation);
    response.sendStatus(204);
  }
}

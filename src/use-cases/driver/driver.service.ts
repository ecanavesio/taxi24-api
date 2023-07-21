import { Driver } from "@app/domain/driver";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { PagingResult } from "@app/types";
import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateDriverDto } from "./dto/create-driver.dto";
import { FilterDriversDto } from "./dto/filter-drivers.dto";
import { NewGeolocationDto } from "./dto/new-geolocation.dto";

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async createDriver(driver: CreateDriverDto): Promise<Driver> {
    return this.driverRepository.create(driver);
  }

  getDrivers(filters: FilterDriversDto): Promise<PagingResult<Driver>> {
    return this.driverRepository.find(filters);
  }

  async getDriverById(driverId: number): Promise<Driver> {
    const driver = await this.driverRepository.getById(driverId);
    if (driver === null) throw new NotFoundException("Driver not found");

    return driver;
  }
  async updateGeolocation(driverId: number, geolocation: NewGeolocationDto): Promise<void> {
    const driver = await this.driverRepository.getById(driverId);
    if (driver === null) throw new NotFoundException("Driver not found");

    await this.driverRepository.update(driverId, { geolocation });
  }
}

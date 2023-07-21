import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { Trip } from "@app/domain/trip";
import { DatabaseManager } from "@app/infrastructure/database/database.manager";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { TripRepository } from "@app/infrastructure/database/repositories/trip.repository";
import { Injectable } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";

@Injectable()
export class TripCreateAction {
  constructor(
    private readonly databaseManager: DatabaseManager,
    private readonly tripRepository: TripRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  async run(trip: CreateTripDto): Promise<Trip> {
    const [tripResult] = await this.databaseManager.transactional(async (manager) => {
      return await Promise.all([
        this.tripRepository.create(trip, manager),
        this.driverRepository.update(trip.driverId, { driverStatus: DriverStatus.ON_TRIP }, manager),
      ]);
    });

    return this.tripRepository.getByIdOrFail(tripResult.tripId);
  }
}

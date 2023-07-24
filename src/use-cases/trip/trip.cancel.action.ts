import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { TripStatus } from "@app/domain/enum/trip-status.enum";
import { Trip } from "@app/domain/trip";
import { DatabaseManager } from "@app/infrastructure/database/database.manager";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { TripRepository } from "@app/infrastructure/database/repositories/trip.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TripCancelAction {
  constructor(
    private readonly databaseManager: DatabaseManager,
    private readonly tripRepository: TripRepository,
    private readonly driverRepository: DriverRepository,
  ) {}

  async run(trip: Trip): Promise<Trip> {
    await this.databaseManager.transactional(async (manager) => {
      return await Promise.all([
        this.tripRepository.update(
          trip.tripId,
          {
            tripStatus: TripStatus.CANCELLED,
          },
          manager,
        ),
        this.driverRepository.update(trip.driver.driverId, { driverStatus: DriverStatus.AVAILABLE }, manager),
      ]);
    });

    return this.tripRepository.getByIdOrFail(trip.tripId);
  }
}

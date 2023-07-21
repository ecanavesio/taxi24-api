import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { TripStatus } from "@app/domain/enum/trip-status.enum";
import { Trip } from "@app/domain/trip";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { PassengerRepository } from "@app/infrastructure/database/repositories/passenger.repository";
import { TripRepository } from "@app/infrastructure/database/repositories/trip.repository";
import { PagingResult } from "@app/types";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

import { CreateTripDto } from "./dto/create-trip.dto";
import { FilterTripDto } from "./dto/filter-trip.dto";
import { FinishTripDto } from "./dto/finish-trip.dto";
import { TripCreateAction } from "./trip-create.action";
import { TripFinishAction } from "./trip.finish.action";

@Injectable()
export class TripService {
  constructor(
    private readonly tripRepository: TripRepository,
    private readonly passengerRepository: PassengerRepository,
    private readonly driverRepository: DriverRepository,
    private readonly tripCreateAction: TripCreateAction,
    private readonly tripFinishAction: TripFinishAction,
  ) {}

  async createTrip(trip: CreateTripDto): Promise<Trip> {
    const [passenger, driver, tripOfPassenger] = await Promise.all([
      this.passengerRepository.getById(trip.passengerId),
      this.driverRepository.getById(trip.driverId),
      this.tripRepository.findOne({ passengerId: trip.passengerId, tripStatus: TripStatus.ACTIVE }),
    ]);
    if (!passenger) throw new NotFoundException("Passenger not found");
    if (!driver) throw new NotFoundException("Driver not found");
    if (tripOfPassenger) throw new BadRequestException("Passenger has an active trip");

    if (trip.fromGeolocation.latitude === trip.toGeolocation.latitude && trip.fromGeolocation.longitude === trip.toGeolocation.longitude) {
      throw new BadRequestException("From and to geolocation are the same");
    }

    if (driver.driverStatus !== DriverStatus.AVAILABLE) throw new BadRequestException("Driver is not available");

    return this.tripCreateAction.run(trip);
  }

  async getTrips(filters: FilterTripDto): Promise<PagingResult<Trip>> {
    return this.tripRepository.find(filters);
  }

  async getTripById(tripId: number): Promise<Trip> {
    const trip = await this.tripRepository.getById(tripId);
    if (trip === null) throw new NotFoundException();

    return trip;
  }

  async finishTrip(tripId: number, props: FinishTripDto): Promise<Trip> {
    const trip = await this.tripRepository.getById(tripId);
    if (trip === null) throw new NotFoundException();

    if (trip.tripStatus !== TripStatus.ACTIVE) throw new BadRequestException("Trip is not active");

    return this.tripFinishAction.run(trip, props);
  }
}

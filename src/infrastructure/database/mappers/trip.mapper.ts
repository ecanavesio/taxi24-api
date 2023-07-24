import { Trip } from "@app/domain/trip";
import { TripWithoutDriverAndPassenger } from "@app/types";
import { point2geolocation, calculateGeodistance } from "@app/utils";

import { TripEntity } from "../entities/trip.entity";

import { driverMapper } from "./driver.mapper";
import { passengerMapper } from "./passenger.mapper";

export function tripMapper(tripEntity: TripEntity): Trip {
  const fromGeolocation = point2geolocation(tripEntity.fromGeolocation);
  const toGeolocation = point2geolocation(tripEntity.toGeolocation);
  const distance = calculateGeodistance(fromGeolocation, toGeolocation);

  return {
    tripId: tripEntity.tripId,
    tripStatus: tripEntity.tripStatus,
    fromGeolocation,
    toGeolocation,
    distance,
    pricePerKmInUsd: tripEntity.pricePerKmInUsd,
    driver: driverMapper(tripEntity.driver),
    passenger: passengerMapper(tripEntity.passenger),
    createdAt: tripEntity.createdAt,
    updatedAt: tripEntity.updatedAt,
  };
}

export function tripCreatedMapper(tripEntity: Omit<TripEntity, "driver" | "passenger">): TripWithoutDriverAndPassenger {
  const fromGeolocation = point2geolocation(tripEntity.fromGeolocation);
  const toGeolocation = point2geolocation(tripEntity.toGeolocation);
  const distance = calculateGeodistance(fromGeolocation, toGeolocation);

  return {
    tripId: tripEntity.tripId,
    tripStatus: tripEntity.tripStatus,
    fromGeolocation,
    toGeolocation,
    distance,
    pricePerKmInUsd: tripEntity.pricePerKmInUsd,
    createdAt: tripEntity.createdAt,
    updatedAt: tripEntity.updatedAt,
  };
}

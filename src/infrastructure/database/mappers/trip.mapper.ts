import { Trip } from "@app/domain/trip";
import { point2geolocation } from "@app/utils";

import { TripEntity } from "../entities/trip.entity";

import { driverMapper } from "./driver.mapper";
import { passengerMapper } from "./passenger.mapper";

export function tripMapper(tripEntity: TripEntity): Trip {
  const trip = new Trip();
  trip.tripId = tripEntity.tripId;
  trip.tripStatus = tripEntity.tripStatus;
  trip.fromGeolocation = point2geolocation(tripEntity.fromGeolocation);
  trip.toGeolocation = point2geolocation(tripEntity.toGeolocation);
  trip.driver = driverMapper(tripEntity.driver);
  trip.passenger = passengerMapper(tripEntity.passenger);
  trip.createdAt = tripEntity.createdAt;
  trip.updatedAt = tripEntity.updatedAt;
  return trip;
}

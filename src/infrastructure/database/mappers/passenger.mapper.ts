import { Passenger } from "@app/domain/passenger";
import { point2geolocation } from "@app/utils";

import { PassengerEntity } from "../entities/passenger.entity";

export function passengerMapper(passengerEntity: PassengerEntity): Passenger {
  const passenger = new Passenger();
  passenger.passengerId = passengerEntity.passengerId;
  passenger.passengerName = passengerEntity.passengerName;
  passenger.passengerPhone = passengerEntity.passengerPhone;
  passenger.geolocation = passengerEntity.geolocation ? point2geolocation(passengerEntity.geolocation) : null;
  return passenger;
}

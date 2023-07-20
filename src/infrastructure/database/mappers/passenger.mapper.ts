import { Passenger } from "@app/domain/passenger";

import { PassengerEntity } from "../entities/passenger.entity";

export function passengerMapper(passengerEntity: PassengerEntity): Passenger {
  const passenger = new Passenger();
  passenger.passengerId = passengerEntity.passengerId;
  passenger.passengerName = passengerEntity.passengerName;
  passenger.passengerPhone = passengerEntity.passengerPhone;
  return passenger;
}

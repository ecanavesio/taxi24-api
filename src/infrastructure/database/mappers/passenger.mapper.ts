import { Passenger } from "@app/domain/passenger";

import { PassengerEntity } from "../entities/passenger.entity";

export function passengerMapper(passengerEntity: PassengerEntity): Passenger {
  return {
    passengerId: passengerEntity.passengerId,
    passengerName: passengerEntity.passengerName,
    passengerPhone: passengerEntity.passengerPhone,
  };
}

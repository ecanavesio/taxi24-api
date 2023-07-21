import { TripStatus } from "@app/domain/enum/trip-status.enum";
import { Trip } from "@app/domain/trip";

export type TripWithoutDriverAndPassenger = Omit<Trip, "driver" | "passenger">;

export type TripFilterOne = {
  passengerId?: number;
  driverId?: number;
  tripStatus?: TripStatus;
};

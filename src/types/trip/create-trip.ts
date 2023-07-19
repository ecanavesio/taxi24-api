import { Geolocation } from "@app/domain/geolocation";

export type CreateTrip = {
  fromGeolocation: Geolocation;
  toGeolocation: Geolocation;
  passengerId: number;
  driverId: number;
};

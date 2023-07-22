import { Geolocation } from "../geolocation";

export interface TripCreate {
  fromGeolocation: Geolocation;
  toGeolocation: Geolocation;
  passengerId: number;
  driverId: number;
  pricePerKmInUsd: number;
}

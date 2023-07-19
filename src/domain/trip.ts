import { Driver } from "./driver";
import { TripStatus } from "./enum/trip-status.enum";
import { Geolocation } from "./geolocation";
import { Passenger } from "./passenger";

export class Trip {
  tripId: number;
  fromGeolocation: Geolocation;
  toGeolocation: Geolocation;
  tripStatus: TripStatus;
  passenger: Passenger;
  driver: Driver;
}

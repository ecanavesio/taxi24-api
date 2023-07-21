import { TripStatus } from "../enum/trip-status.enum";
import { Geolocation } from "../geolocation";

export interface TripUpdate {
  tripStatus?: TripStatus;
  toGeolocation?: Geolocation;
}

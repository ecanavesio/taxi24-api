import { Geolocation } from "../geolocation";

export interface PassengerUpdate {
  passengerName?: string;
  passengerPhone?: string;
  geolocation?: Geolocation;
}

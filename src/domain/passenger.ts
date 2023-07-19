import { Geolocation } from "./geolocation";

export class Passenger {
  passengerId: number;
  passengerName: string;
  passengerPhone: string;
  geolocation: Geolocation | null;
}

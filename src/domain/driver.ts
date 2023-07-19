import { DriverStatus } from "./enum/driver-status.enum";
import { Geolocation } from "./geolocation";

export class Driver {
  driverId: number;
  driverName: string;
  driverStatus: DriverStatus;
  carDescription: string;
  pricePerKmInUsd: number;
  geolocation: Geolocation | null;
}

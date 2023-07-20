import { DriverStatus } from "../enum/driver-status.enum";
import { Geolocation } from "../geolocation";

export interface DriverUpdate {
  driverName?: string;
  driverStatus?: DriverStatus;
  carDescription?: string;
  pricePerKmInUsd?: number;
  geolocation?: Geolocation;
}

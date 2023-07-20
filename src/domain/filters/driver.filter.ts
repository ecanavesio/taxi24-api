import { PagingRequest } from "@app/types/paging";

import { DriverStatus } from "../enum/driver-status.enum";
import { Geolocation } from "../geolocation";

export interface DriverFilter extends PagingRequest {
  driverStatus?: DriverStatus;
  maxPricePerKmInUsd?: number;
  minPricePerKmInUsd?: number;
  nearToGeolocation?: Geolocation & { maxDistanceInKm: number };
}

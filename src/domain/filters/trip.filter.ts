import { PagingRequest } from "@app/types";

import { TripStatus } from "../enum/trip-status.enum";

export interface TripFilter extends PagingRequest {
  passengerId?: number;
  driverId?: number;
  tripStatus?: TripStatus;
  fromDate?: string;
  toDate?: string;
}

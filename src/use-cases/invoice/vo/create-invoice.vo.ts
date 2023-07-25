import { RenderContext } from "@app/types/templates";

export interface CreateInvoiceVo extends RenderContext {
  tripId: string;
  passengerName: string;
  driverName: string;
  fromGeolocation: {
    latitude: string;
    longitude: string;
  };
  toGeolocation: {
    latitude: string;
    longitude: string;
  };
  distance: string;
  pricePerKmInUsd: string;
  totalToPay: string;
}

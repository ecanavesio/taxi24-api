import { Driver } from "@app/domain/driver";
import { point2geolocation } from "@app/utils";

import { DriverEntity } from "../entities/driver.entity";

export function driverMapper(driverEntity: DriverEntity): Driver {
  return {
    driverId: driverEntity.driverId,
    driverName: driverEntity.driverName,
    driverStatus: driverEntity.driverStatus,
    carDescription: driverEntity.carDescription,
    pricePerKmInUsd: driverEntity.pricePerKmInUsd,
    geolocation: driverEntity.geolocation ? point2geolocation(driverEntity.geolocation) : null,
  };
}

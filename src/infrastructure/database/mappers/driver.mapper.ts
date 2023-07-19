import { Driver } from "@app/domain/driver";
import { point2geolocation } from "@app/utils";

import { DriverEntity } from "../entities/driver.entity";

export function driverMapper(driverEntity: DriverEntity): Driver {
  const driver = new Driver();
  driver.driverId = driverEntity.driverId;
  driver.driverName = driverEntity.driverName;
  driver.driverStatus = driverEntity.driverStatus;
  driver.carDescription = driverEntity.carDescription;
  driver.pricePerKmInUsd = driverEntity.pricePerKmInUsd;
  driver.geolocation = driverEntity.geolocation ? point2geolocation(driverEntity.geolocation) : null;

  return driver;
}

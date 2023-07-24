import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { Column, Entity, Point, PrimaryGeneratedColumn } from "typeorm";

import { WithTimestamps } from "./extends/with-timestamps";

@Entity({ name: "drivers" })
export class DriverEntity extends WithTimestamps {
  @PrimaryGeneratedColumn({ name: "driver_id", type: "bigint", primaryKeyConstraintName: "pk_driver_id" })
  driverId: number;

  @Column({ name: "driver_name", type: "varchar", length: 80 })
  driverName: string;

  @Column({ name: "car_description", type: "varchar", length: 300 })
  carDescription: string;

  @Column({ name: "price_per_km_in_usd", type: "decimal", precision: 10, scale: 4 })
  pricePerKmInUsd: number;

  @Column("geography", { nullable: true, spatialFeatureType: "Point", srid: 4326 })
  geolocation?: Point;

  @Column({ name: "driver_status", type: "enum", enum: DriverStatus, default: DriverStatus.AVAILABLE })
  driverStatus: DriverStatus;
}

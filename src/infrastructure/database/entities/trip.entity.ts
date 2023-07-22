import { TripStatus } from "@app/domain/enum/trip-status.enum";
import { Column, Entity, JoinColumn, ManyToOne, Point, PrimaryGeneratedColumn } from "typeorm";

import { DriverEntity } from "./driver.entity";
import { WithTimestamps } from "./extends/with-timestamps";
import { PassengerEntity } from "./passenger.entity";

@Entity({ name: "trips" })
export class TripEntity extends WithTimestamps {
  @PrimaryGeneratedColumn({ name: "trip_id", type: "bigint", primaryKeyConstraintName: "pk_trip_id" })
  tripId: number;

  @Column("geography", { name: "from_geolocation", nullable: false, spatialFeatureType: "Point", srid: 4326 })
  fromGeolocation: Point;

  @Column("geography", { name: "to_geolocation", nullable: false, spatialFeatureType: "Point", srid: 4326 })
  toGeolocation: Point;

  @Column({ name: "passenger_id", type: "bigint" })
  passengerId: number;

  @Column({ name: "driver_id", type: "bigint" })
  driverId: number;

  @Column({ name: "trip_status", type: "enum", enum: TripStatus, default: TripStatus.ACTIVE })
  tripStatus: TripStatus;

  @Column({ name: "price_per_km_in_usd", type: "decimal", precision: 10, scale: 4 })
  pricePerKmInUsd: number;

  @ManyToOne(() => PassengerEntity)
  @JoinColumn({ name: "passenger_id", foreignKeyConstraintName: "fk_trip_passenger_id" })
  passenger: PassengerEntity;

  @ManyToOne(() => DriverEntity)
  @JoinColumn({ name: "driver_id", foreignKeyConstraintName: "fk_trip_driver_id" })
  driver: DriverEntity;
}

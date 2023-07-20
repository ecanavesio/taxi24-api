import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { WithTimestamps } from "./extends/with-timestamps";

@Entity({ name: "passengers" })
export class PassengerEntity extends WithTimestamps {
  @PrimaryGeneratedColumn({ name: "passenger_id", type: "bigint" })
  passengerId: number;

  @Column({ name: "passenger_name", type: "varchar", length: 80 })
  passengerName: string;

  @Column({ name: "passenger_phone", type: "varchar", length: 30 })
  passengerPhone: string;
}

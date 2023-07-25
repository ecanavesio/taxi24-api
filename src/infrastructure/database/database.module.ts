import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DatabaseManager } from "./database.manager";
import { DriverEntity } from "./entities/driver.entity";
import { PassengerEntity } from "./entities/passenger.entity";
import { TripEntity } from "./entities/trip.entity";
import { PostgresFactory } from "./postgres.factory";
import { DriverRepository } from "./repositories/driver.repository";
import { PassengerRepository } from "./repositories/passenger.repository";
import { TripRepository } from "./repositories/trip.repository";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: PostgresFactory,
    }),
    TypeOrmModule.forFeature([DriverEntity, PassengerEntity, TripEntity]),
  ],
  providers: [DriverRepository, PassengerRepository, TripRepository, DatabaseManager],
  exports: [DriverRepository, PassengerRepository, TripRepository, DatabaseManager],
})
export class DatabaseModule {}

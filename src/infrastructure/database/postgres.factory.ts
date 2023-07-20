import { ApplicationEnvironmentVariables } from "@app/config/environment/types/application.environment";
import { PostgresEnvironmentVariables } from "@app/config/environment/types/postgres.environment";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { DriverEntity } from "./entities/driver.entity";
import { PassengerEntity } from "./entities/passenger.entity";
import { TripEntity } from "./entities/trip.entity";

export const PostgresFactory = (configService: ConfigService<ApplicationEnvironmentVariables>): TypeOrmModuleOptions => ({
  type: "postgres",
  ...configService.get<PostgresEnvironmentVariables>("postgres"),
  useUTC: true,
  connectTimeoutMS: 10_000,
  entities: [DriverEntity, PassengerEntity, TripEntity],
  logging: true,
});

import { PostgresModule } from "@app/infrastructure/database/postgres.module";
import { Module } from "@nestjs/common";

import { PassengerController } from "./passenger.controller";
import { PassengerService } from "./passenger.service";

@Module({
  imports: [PostgresModule],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}

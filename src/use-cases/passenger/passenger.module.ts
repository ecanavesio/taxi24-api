import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { Module } from "@nestjs/common";

import { PassengerController } from "./passenger.controller";
import { PassengerService } from "./passenger.service";

@Module({
  imports: [DatabaseModule],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}

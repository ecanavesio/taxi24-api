import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { Module } from "@nestjs/common";

import { TripCreateAction } from "./trip-create.action";
import { TripCancelAction } from "./trip.cancel.action";
import { TripController } from "./trip.controller";
import { TripFinishAction } from "./trip.finish.action";
import { TripService } from "./trip.service";

@Module({
  imports: [DatabaseModule],
  controllers: [TripController],
  providers: [TripService, TripCreateAction, TripFinishAction, TripCancelAction],
})
export class TripModule {}

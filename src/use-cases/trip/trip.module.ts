import { PostgresModule } from "@app/infrastructure/database/database.module";
import { Module } from "@nestjs/common";

import { TripCreateAction } from "./trip-create.action";
import { TripController } from "./trip.controller";
import { TripFinishAction } from "./trip.finish.action";
import { TripService } from "./trip.service";

@Module({
  imports: [PostgresModule],
  controllers: [TripController],
  providers: [TripService, TripCreateAction, TripFinishAction],
})
export class TripModule {}

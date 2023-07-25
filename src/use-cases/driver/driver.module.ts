import { DatabaseModule } from "@app/infrastructure/database/database.module";
import { Module } from "@nestjs/common";

import { DriverController } from "./driver.controller";
import { DriverService } from "./driver.service";

@Module({
  imports: [DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}

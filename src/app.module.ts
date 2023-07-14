import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { EnvironmentModule } from "./config/environment/environment.module";
import { PostgresModule } from "./infrastructure/database/postgres.module";

@Module({
  imports: [EnvironmentModule, PostgresModule],
  controllers: [AppController],
})
export class AppModule {}

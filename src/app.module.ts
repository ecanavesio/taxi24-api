import { join } from "path";

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AppController } from "./app.controller";
import { EnvironmentModule } from "./config/environment/environment.module";
import { PostgresModule } from "./infrastructure/database/postgres.module";
import { DriverModule } from "./use-cases/driver/driver.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "assets"),
      serveRoot: "/assets",
    }),
    EnvironmentModule,
    PostgresModule,
    DriverModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

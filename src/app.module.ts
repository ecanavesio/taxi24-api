import { join } from "path";

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AppController } from "./app.controller";
// Configuration
import { EnvironmentModule } from "./config/environment/environment.module";
// Infrastructure
import { DatabaseModule } from "./infrastructure/database/database.module";
import { PdfRendererModule } from "./infrastructure/pdf-renderer/pdf-renderer.module";
import { TemplateRendererModule } from "./infrastructure/template-renderer/template-renderer.module";
// Use Cases
import { DriverModule } from "./use-cases/driver/driver.module";
import { InvoiceModule } from "./use-cases/invoice/invoice.module";
import { PassengerModule } from "./use-cases/passenger/passenger.module";
import { TripModule } from "./use-cases/trip/trip.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "assets"),
      serveRoot: "/assets",
    }),
    EnvironmentModule,
    DatabaseModule,
    PdfRendererModule,
    TemplateRendererModule,
    DriverModule,
    InvoiceModule,
    PassengerModule,
    TripModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

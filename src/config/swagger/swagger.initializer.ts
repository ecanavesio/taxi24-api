import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

/**
 * @TODOS
 * - Create a tags enum
 * - Complete descriptions on each tag
 * - Complete descriptions of documentation
 */
export abstract class SwaggerInitializer {
  public static run(app: NestExpressApplication): void {
    const config = new DocumentBuilder()
      .setTitle("Taxi 24")
      .setDescription("")
      .setVersion("1.0")
      .addTag("Drivers")
      .addTag("Passengers")
      .addTag("Trips")
      .addTag("Invoices")
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document, {
      customfavIcon: "/assets/favicon.ico",
      customCssUrl: "/assets/styles.css",
      customSiteTitle: "Taxi24 - Swagger UI",
    });
  }
}

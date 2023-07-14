import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { SwaggerInitializer } from "./config/swagger/swagger.initializer";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true,
  });
  app.enableShutdownHooks();
  app.use(helmet());
  app.disable("X-Powered-By");

  SwaggerInitializer.run(app);

  const port = process.env.PORT || 8000;
  await app.listen(port);
}
bootstrap();

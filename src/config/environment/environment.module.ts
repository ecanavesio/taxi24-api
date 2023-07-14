import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvironmentFactory } from "./environment.factory";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvironmentFactory],
    }),
  ],
})
export class EnvironmentModule {}

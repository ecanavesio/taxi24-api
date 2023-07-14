import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { ApplicationEnvironmentVariables } from "@app/config/environment/types/application.environment";
import { PostgresEnvironmentVariables } from "@app/config/environment/types/postgres.environment";

export const PostgresFactory = (configService: ConfigService<ApplicationEnvironmentVariables>): TypeOrmModuleOptions => ({
  type: "postgres",
  ...configService.get<PostgresEnvironmentVariables>("postgres"),
  useUTC: true,
  connectTimeoutMS: 10_000,
});

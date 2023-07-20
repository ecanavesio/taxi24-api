import { PartialDeep } from "type-fest";

import { ApplicationEnvironmentVariables, NodeEnv } from "./types/application.environment";

export const getEnvironmentVariables = (): PartialDeep<ApplicationEnvironmentVariables> => ({
  env: process.env.NODE_ENV as NodeEnv,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: process.env.POSTGRES_SYNCHRONIZE === "true",
    autoLoadEntities: process.env.POSTGRES_AUTOLOAD_ENTITIES === "true",
    logging: process.env.POSTGRES_LOGGING === "true",
  },
});

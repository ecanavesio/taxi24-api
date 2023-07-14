import { Type } from "class-transformer";
import { IsEnum, IsInt, ValidateNested } from "class-validator";

import { PostgresEnvironmentVariables } from "./postgres.environment";

export enum NodeEnv {
  Development = "develop",
  Production = "prod",
  Test = "test",
}

export class ApplicationEnvironmentVariables {
  @IsEnum(NodeEnv)
  env: NodeEnv;

  @IsInt()
  port: number;

  @ValidateNested()
  @Type(() => PostgresEnvironmentVariables)
  postgres: PostgresEnvironmentVariables;
}

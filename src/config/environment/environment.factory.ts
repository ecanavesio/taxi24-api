import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { EnvironmentVariableError } from "@app/exceptions";

import { ApplicationEnvironmentVariables } from "./types/application.environment";
import { getEnvironmentVariables } from "./variables";

export const EnvironmentFactory = async (): Promise<ApplicationEnvironmentVariables> => {
  const environmentVariables = getEnvironmentVariables();
  const result = plainToClass(ApplicationEnvironmentVariables, environmentVariables);
  const errors = await validate(result);
  if (errors.length > 0) {
    throw new EnvironmentVariableError(errors);
  }
  return result;
};

import { ValidationError } from "class-validator";

export class EnvironmentVariableError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super("Some environment variables have errors\n\t" + errors.join("\n\t") + "\n");
  }

  override toString(): string {
    return this.message + "\n\t" + this.errors.join("\n\t") + "\n";
  }
}

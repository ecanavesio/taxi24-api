import { IsString, IsInt, IsBoolean } from "class-validator";

export class PostgresEnvironmentVariables {
  @IsString()
  host: string;

  @IsInt()
  port: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  database: string;

  @IsBoolean()
  synchronize: boolean;

  @IsBoolean()
  autoLoadEntities: boolean;

  @IsBoolean()
  logging: boolean;
}

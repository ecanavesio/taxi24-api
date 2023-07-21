import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString, IsEnum, IsOptional, ValidateNested } from "class-validator";

import { DriverStatus } from "./enum/driver-status.enum";
import { Geolocation } from "./geolocation";

export class Driver {
  @ApiProperty({ type: Number })
  @IsNumber()
  driverId: number;

  @ApiProperty({ type: String })
  @IsString()
  driverName: string;

  @ApiProperty({ enum: DriverStatus })
  @IsEnum(DriverStatus)
  driverStatus: DriverStatus;

  @ApiProperty({ type: String })
  @IsString()
  carDescription: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  pricePerKmInUsd: number;

  @ApiProperty({ type: Geolocation, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => Geolocation)
  geolocation: Geolocation | null;
}

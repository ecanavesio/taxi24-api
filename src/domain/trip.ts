import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsEnum, ValidateNested } from "class-validator";

import { Driver } from "./driver";
import { TripStatus } from "./enum/trip-status.enum";
import { Geolocation } from "./geolocation";
import { Passenger } from "./passenger";

export class Trip {
  @ApiProperty({ type: Number })
  @IsNumber()
  tripId: number;

  @ApiProperty({ type: Geolocation })
  @ValidateNested()
  @Type(() => Geolocation)
  fromGeolocation: Geolocation;

  @ApiProperty({ type: Geolocation })
  @ValidateNested()
  @Type(() => Geolocation)
  toGeolocation: Geolocation;

  @ApiProperty({ type: Number })
  @IsNumber()
  distance: number;

  @ApiProperty({ enum: TripStatus })
  @IsEnum(TripStatus)
  tripStatus: TripStatus;

  @ApiProperty({ type: Number })
  @IsNumber()
  pricePerKmInUsd: number;

  @ApiProperty({ type: Passenger })
  @ValidateNested()
  @Type(() => Passenger)
  passenger: Passenger;

  @ApiProperty({ type: Driver })
  @ValidateNested()
  @Type(() => Driver)
  driver: Driver;

  @ApiProperty({ type: String })
  createdAt: string;

  @ApiProperty({ type: String })
  updatedAt: string;
}

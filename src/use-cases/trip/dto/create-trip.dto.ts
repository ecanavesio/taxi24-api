import { TripCreate } from "@app/domain/creates/trip.create";
import { Geolocation } from "@app/domain/geolocation";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsObject, ValidateNested } from "class-validator";

export class CreateTripDto implements Omit<TripCreate, "pricePerKmInUsd"> {
  @ApiProperty({ type: () => Geolocation })
  @IsObject()
  @ValidateNested()
  @Type(() => Geolocation)
  fromGeolocation: Geolocation;

  @ApiProperty({ type: () => Geolocation })
  @IsObject()
  @ValidateNested()
  @Type(() => Geolocation)
  toGeolocation: Geolocation;

  @ApiProperty()
  @IsNumber()
  passengerId: number;

  @ApiProperty()
  @IsNumber()
  driverId: number;
}

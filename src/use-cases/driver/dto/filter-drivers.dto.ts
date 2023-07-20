import { IsGreaterThan } from "@app/decorators/validations/more-than.decorator";
import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { DriverFilter } from "@app/domain/filters/driver.filter";
import { Geolocation } from "@app/domain/geolocation";
import { PagingRequest } from "@app/types/paging";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type, plainToInstance } from "class-transformer";
import { IsNumber, IsOptional, IsEnum, Min } from "class-validator";

export class NearToGeolocation extends Geolocation {
  @ApiProperty({ example: 10.0, description: "The latitude of the geolocation" })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 20.0, description: "The longitude of the geolocation" })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 5, description: "The maximum distance in kilometers" })
  @IsNumber()
  @Min(0)
  maxDistanceInKm: number;
}

export class FilterDriversDto extends PagingRequest implements DriverFilter {
  @IsOptional()
  @IsEnum(DriverStatus)
  @ApiProperty({ enum: DriverStatus, description: "The status of the driver", required: false })
  driverStatus?: DriverStatus;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsGreaterThan("minPricePerKmInUsd")
  @ApiProperty({ type: "number", description: "The maximum price per km in USD", required: false })
  maxPricePerKmInUsd?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({ type: "number", description: "The minimum price per km in USD", required: false })
  minPricePerKmInUsd?: number;

  @IsOptional()
  @Transform(({ value }) => plainToInstance(NearToGeolocation, JSON.parse(value)))
  @ApiProperty({
    type: "object",
    properties: {
      latitude: { type: "number" },
      longitude: { type: "number" },
      maxDistanceInKm: { type: "number" },
    },
    description: "The geolocation and maximum distance filter",
    required: false,
  })
  nearToGeolocation?: NearToGeolocation;
}

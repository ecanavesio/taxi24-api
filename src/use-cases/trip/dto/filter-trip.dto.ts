import { TripStatus } from "@app/domain/enum/trip-status.enum";
import { TripFilter } from "@app/domain/filters/trip.filter";
import { PagingRequest } from "@app/types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsEnum, IsDateString } from "class-validator";

export class FilterTripDto extends PagingRequest implements TripFilter {
  @ApiProperty({ required: false, type: "number" })
  @IsOptional()
  @IsNumber()
  passengerId?: number;

  @ApiProperty({ required: false, type: "number" })
  @IsOptional()
  @IsNumber()
  driverId?: number;

  @ApiProperty({ required: false, enum: TripStatus })
  @IsOptional()
  @IsEnum(TripStatus)
  tripStatus?: TripStatus;

  @ApiProperty({ required: false, type: "string", format: "date" })
  @IsOptional()
  @IsDateString()
  // @IsLessThan("toDate")
  fromDate?: string;

  @ApiProperty({ required: false, type: "string", format: "date" })
  @IsOptional()
  @IsDateString()
  // @MaxDate(new Date())
  toDate?: string;
}

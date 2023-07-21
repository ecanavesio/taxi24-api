import { Geolocation } from "@app/domain/geolocation";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

export class FinishTripDto {
  @ApiPropertyOptional({ type: () => Geolocation })
  @IsOptional()
  @ValidateNested()
  @Type(() => Geolocation)
  toGeolocation?: Geolocation;
}

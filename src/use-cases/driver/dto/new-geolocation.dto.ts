import { Geolocation } from "@app/domain/geolocation";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class NewGeolocationDto extends Geolocation {
  @ApiProperty({ example: 10.0, description: "The latitude of the geolocation" })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 20.0, description: "The longitude of the geolocation" })
  @IsNumber()
  longitude: number;
}

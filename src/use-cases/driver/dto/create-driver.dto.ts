import { Trim } from "@app/decorators/transform/trim.decorator";
import { DriverCreate } from "@app/domain/creates/driver.create";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length, Min } from "class-validator";

export class CreateDriverDto implements DriverCreate {
  @ApiProperty({
    description: "Name of the driver",
    example: "John Doe",
    maxLength: 80,
  })
  @IsString()
  @Length(1, 80)
  @Trim()
  driverName: string;

  @ApiProperty({
    description: "Description of the car",
    example: "Black Sedan",
    maxLength: 300,
  })
  @IsString()
  @Length(1, 300)
  @Trim()
  carDescription: string;

  @ApiProperty({
    description: "Price per kilometer in USD",
    example: 5.99,
  })
  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0)
  pricePerKmInUsd: number;
}

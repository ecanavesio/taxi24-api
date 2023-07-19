import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class CreateDriverDto {
  @ApiProperty({
    description: "Name of the driver",
    example: "John Doe",
    maxLength: 80,
  })
  @IsString()
  @Length(1, 80)
  driverName: string;

  @ApiProperty({
    description: "Description of the car",
    example: "Black Sedan",
    maxLength: 300,
  })
  @IsString()
  @Length(1, 300)
  carDescription: string;

  @ApiProperty({
    description: "Price per kilometer in USD",
    example: 5.99,
  })
  @IsNumber({ maxDecimalPlaces: 4 })
  pricePerKmInUsd: number;
}

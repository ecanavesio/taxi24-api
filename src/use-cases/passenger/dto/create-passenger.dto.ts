import { PassengerCreate } from "@app/domain/creates/passenger.create";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";

export class CreatePassengerDto implements PassengerCreate {
  @ApiProperty({
    description: "The name of the passenger",
    example: "John Doe",
  })
  @IsString()
  passengerName: string;

  @ApiProperty({
    description: "The phone number of the passenger",
    example: "1234567890",
  })
  @IsString()
  @Length(10)
  @Matches(/^[0-9]+$/)
  passengerPhone: string;
}

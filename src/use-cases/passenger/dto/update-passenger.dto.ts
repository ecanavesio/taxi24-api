import { PassengerUpdate } from "@app/domain/updates/passenger.update";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, Length, Matches } from "class-validator";

export class UpdatePassengerDto implements PassengerUpdate {
  @ApiProperty({
    description: "The name of the passenger",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  passengerName?: string;

  @ApiProperty({
    description: "The phone number of the passenger",
    example: "1234567890",
  })
  @IsOptional()
  @IsString()
  @Length(10)
  @Matches(/^[0-9]+$/)
  passengerPhone?: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsPhoneNumber } from "class-validator";

export class Passenger {
  @ApiProperty({ type: Number })
  @IsNumber()
  passengerId: number;

  @ApiProperty({ type: String })
  @IsString()
  passengerName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsPhoneNumber()
  passengerPhone: string;
}

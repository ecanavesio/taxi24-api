import { ApiPropertyOptional, ApiResponseProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class Paging {
  @ApiResponseProperty()
  limit: number;

  @ApiResponseProperty()
  offset: number;

  @ApiResponseProperty()
  total?: number;
}

export class PagingResult<T> {
  data: T[];

  @ApiResponseProperty({
    type: Paging,
  })
  meta: Paging;
}

export class PagingRequest {
  @ApiPropertyOptional({ default: 20, maximum: 1000, minimum: 1 })
  @Min(1)
  @Max(1000)
  @IsNumber()
  @Type(() => Number)
  limit = 20;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @Min(0)
  @IsNumber()
  @Type(() => Number)
  offset = 0;
}

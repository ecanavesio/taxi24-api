import { PassengerFilter } from "@app/domain/filters/passenger.filter";
import { PagingRequest } from "@app/types";

export class FilterPassengerDto extends PagingRequest implements PassengerFilter {}

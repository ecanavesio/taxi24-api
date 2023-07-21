import { Passenger } from "@app/domain/passenger";
import { PassengerRepository } from "@app/infrastructure/database/repositories/passenger.repository";
import { PagingResult } from "@app/types";
import { Injectable, NotFoundException } from "@nestjs/common";

import { CreatePassengerDto } from "./dto/create-passenger.dto";
import { FilterPassengerDto } from "./dto/filter-passenger.dto";
import { UpdatePassengerDto } from "./dto/update-passenger.dto";

@Injectable()
export class PassengerService {
  constructor(private readonly passengerRepository: PassengerRepository) {}

  async createPassenger(passenger: CreatePassengerDto): Promise<Passenger> {
    return this.passengerRepository.create(passenger);
  }

  async getPassengers(filters: FilterPassengerDto): Promise<PagingResult<Passenger>> {
    return this.passengerRepository.find(filters);
  }

  async getPassengerById(passengerId: number): Promise<Passenger> {
    const passenger = await this.passengerRepository.getById(passengerId);
    if (passenger === null) throw new NotFoundException("Passenger not found");

    return passenger;
  }

  async updatePassenger(passengerId: number, props: UpdatePassengerDto): Promise<void> {
    const passenger = await this.passengerRepository.getById(passengerId);
    if (passenger === null) throw new NotFoundException("Passenger not found");

    await this.passengerRepository.update(passengerId, props);
  }
}

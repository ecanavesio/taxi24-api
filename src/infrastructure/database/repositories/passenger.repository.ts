import { PassengerCreate } from "@app/domain/creates/passenger.create";
import { Passenger } from "@app/domain/passenger";
import { PassengerUpdate } from "@app/domain/updates/passenger.update";
import { PagingRequest, PagingResult } from "@app/types/paging";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PassengerEntity } from "../entities/passenger.entity";
import { passengerMapper } from "../mappers/passenger.mapper";

@Injectable()
export class PassengerRepository {
  constructor(
    @InjectRepository(PassengerEntity)
    private readonly repository: Repository<PassengerEntity>,
  ) {}

  async getById(passengerId: number): Promise<Passenger | null> {
    const passenger = await this.repository.findOne({ where: { passengerId } });
    if (!passenger) return null;

    return passengerMapper(passenger);
  }

  async find(filters: PagingRequest): Promise<PagingResult<Passenger>> {
    const [passengers, total] = await this.repository.findAndCount({
      take: filters.limit,
      skip: filters.offset,
    });

    return {
      data: passengers.map(passengerMapper),
      meta: {
        limit: filters.limit,
        offset: filters.offset,
        total,
      },
    };
  }

  async create(entity: PassengerCreate): Promise<Passenger> {
    const passenger: PassengerEntity = await this.repository.save({
      passengerName: entity.passengerName,
      passengerPhone: entity.passengerPhone,
    });

    return passengerMapper(passenger);
  }

  async update(passengerId: number, partialEntity: PassengerUpdate): Promise<{ affected?: number }> {
    const definedValues: Partial<PassengerEntity> = {};

    if (partialEntity.passengerName) definedValues.passengerName = partialEntity.passengerName;
    if (partialEntity.passengerPhone) definedValues.passengerPhone = partialEntity.passengerPhone;

    return this.repository.update(passengerId, definedValues);
  }
}

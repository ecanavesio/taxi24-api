import { PassengerCreate } from "@app/domain/creates/passenger.create";
import { PassengerFilter } from "@app/domain/filters/passenger.filter";
import { Passenger } from "@app/domain/passenger";
import { PassengerUpdate } from "@app/domain/updates/passenger.update";
import { PagingResult } from "@app/types";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TransactionalManager } from "../database.manager";
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

  async find(filters: PassengerFilter): Promise<PagingResult<Passenger>> {
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

  async create(entity: PassengerCreate, transactionalManager?: TransactionalManager): Promise<Passenger> {
    const repository = transactionalManager ? transactionalManager.getRepository(PassengerEntity) : this.repository;
    const passenger: PassengerEntity = await repository.save({
      passengerName: entity.passengerName,
      passengerPhone: entity.passengerPhone,
    });

    return passengerMapper(passenger);
  }

  async update(passengerId: number, partialEntity: PassengerUpdate, transactionalManager?: TransactionalManager): Promise<{ affected?: number }> {
    const definedValues: Partial<PassengerEntity> = {};

    if (partialEntity.passengerName) definedValues.passengerName = partialEntity.passengerName;
    if (partialEntity.passengerPhone) definedValues.passengerPhone = partialEntity.passengerPhone;

    const repository = transactionalManager ? transactionalManager.getRepository(PassengerEntity) : this.repository;
    return repository.update(passengerId, definedValues);
  }
}

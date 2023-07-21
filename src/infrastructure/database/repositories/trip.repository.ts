import { TripCreate } from "@app/domain/creates/trip.create";
import { TripFilter } from "@app/domain/filters/trip.filter";
import { Trip } from "@app/domain/trip";
import { TripUpdate } from "@app/domain/updates/trip.update";
import { PagingResult, TripFilterOne, TripWithoutDriverAndPassenger } from "@app/types";
import { geolocation2point } from "@app/utils";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

import { TransactionalManager } from "../database.manager";
import { TripEntity } from "../entities/trip.entity";
import { tripCreatedMapper as tripWithoutDriverAndPassengerMapper, tripMapper } from "../mappers/trip.mapper";

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(TripEntity)
    private readonly repository: Repository<TripEntity>,
  ) {}

  async getById(tripId: number): Promise<Trip | null> {
    const trip = await this.repository.findOne({ where: { tripId }, relations: ["passenger", "driver"] });
    if (!trip) return null;

    return tripMapper(trip);
  }

  async getByIdOrFail(tripId: number): Promise<Trip> {
    const trip = await this.repository.findOneOrFail({ where: { tripId }, relations: ["passenger", "driver"] });
    return tripMapper(trip);
  }

  async findOne(filterOne: TripFilterOne): Promise<TripWithoutDriverAndPassenger | null> {
    const whereClause: FindOptionsWhere<TripEntity> = {};

    if (filterOne.tripStatus) whereClause.tripStatus = filterOne.tripStatus;
    if (filterOne.passengerId) whereClause.passengerId = filterOne.passengerId;
    if (filterOne.driverId) whereClause.driverId = filterOne.driverId;

    const trip = await this.repository.findOne({ where: whereClause });
    if (!trip) return null;

    return tripWithoutDriverAndPassengerMapper(trip);
  }

  async find(filters: TripFilter): Promise<PagingResult<Trip>> {
    const whereClause: FindOptionsWhere<TripEntity> = {};

    if (filters.tripStatus) whereClause.tripStatus = filters.tripStatus;

    if (filters.passengerId) whereClause.passengerId = filters.passengerId;

    if (filters.driverId) whereClause.driverId = filters.driverId;

    if (filters.fromDate && filters.toDate) whereClause.createdAt = And(MoreThanOrEqual(filters.fromDate), LessThanOrEqual(filters.toDate));
    else if (filters.fromDate) whereClause.createdAt = MoreThanOrEqual(filters.fromDate);
    else if (filters.toDate) whereClause.createdAt = LessThanOrEqual(filters.toDate);

    const [trips, total] = await this.repository.findAndCount({
      where: whereClause,
      take: filters.limit,
      skip: filters.offset,
      relations: ["passenger", "driver"],
    });

    return {
      data: trips.map(tripMapper),
      meta: {
        limit: filters.limit,
        offset: filters.offset,
        total,
      },
    };
  }

  async create(entity: TripCreate, transactionalManager?: TransactionalManager): Promise<TripWithoutDriverAndPassenger> {
    const repository = transactionalManager ? transactionalManager.getRepository(TripEntity) : this.repository;

    const trip: Omit<TripEntity, "driver" | "passenger"> = await repository.save({
      fromGeolocation: geolocation2point(entity.fromGeolocation),
      toGeolocation: geolocation2point(entity.toGeolocation),
      passengerId: entity.passengerId,
      driverId: entity.driverId,
    });

    return tripWithoutDriverAndPassengerMapper(trip);
  }

  async update(tripId: number, partialEntity: TripUpdate, transactionalManager?: TransactionalManager): Promise<{ affected?: number }> {
    const definedValues: Partial<TripEntity> = {};

    if (partialEntity.tripStatus) definedValues.tripStatus = partialEntity.tripStatus;
    if (partialEntity.toGeolocation) definedValues.toGeolocation = geolocation2point(partialEntity.toGeolocation);

    const repository = transactionalManager ? transactionalManager.getRepository(TripEntity) : this.repository;
    return repository.update(tripId, definedValues);
  }
}

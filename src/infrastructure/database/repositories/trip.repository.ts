import { Trip } from "@app/domain/trip";
import { PagingRequest, PagingResult } from "@app/types/paging";
import { CreateTrip } from "@app/types/trip";
import { geolocation2point } from "@app/utils";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { TripEntity } from "../entities/trip.entity";
import { tripMapper } from "../mappers/trip.mapper";

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(TripEntity)
    private readonly repository: Repository<TripEntity>,
  ) {}

  async getById(tripId: number): Promise<Trip | null> {
    const trip = await this.repository.findOne({ where: { tripId } });
    if (!trip) return null;

    return tripMapper(trip);
  }

  async find(filters: PagingRequest): Promise<PagingResult<Trip>> {
    const [trips, total] = await this.repository.findAndCount({
      take: filters.limit,
      skip: filters.offset,
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

  async create(entity: CreateTrip): Promise<Trip> {
    const trip: TripEntity = await this.repository.save({
      fromGeolocation: geolocation2point(entity.fromGeolocation),
      toGeolocation: geolocation2point(entity.toGeolocation),
      passengerId: entity.passengerId,
      driverId: entity.driverId,
    });

    return tripMapper(trip);
  }
}

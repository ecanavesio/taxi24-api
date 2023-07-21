import { DriverCreate } from "@app/domain/creates/driver.create";
import { Driver } from "@app/domain/driver";
import { DriverFilter } from "@app/domain/filters/driver.filter";
import { DriverUpdate } from "@app/domain/updates/driver.update";
import { PagingResult } from "@app/types";
import { geolocation2point } from "@app/utils";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { And, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Raw, Repository } from "typeorm";

import { TransactionalManager } from "../database.manager";
import { DriverEntity } from "../entities/driver.entity";
import { driverMapper } from "../mappers/driver.mapper";

@Injectable()
export class DriverRepository {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly repository: Repository<DriverEntity>,
  ) {}

  async getById(driverId: number): Promise<Driver | null> {
    const driver = await this.repository.findOne({ where: { driverId } });
    if (!driver) return null;

    return driverMapper(driver);
  }

  async getByIdOrFail(driverId: number): Promise<Driver> {
    const driver = await this.repository.findOneOrFail({ where: { driverId } });
    return driverMapper(driver);
  }

  async find(filters: DriverFilter): Promise<PagingResult<Driver>> {
    const whereClause: FindOptionsWhere<DriverEntity> = {};

    if (filters.driverStatus) whereClause.driverStatus = filters.driverStatus;

    if (filters.minPricePerKmInUsd && filters.maxPricePerKmInUsd) {
      whereClause.pricePerKmInUsd = And(MoreThanOrEqual(filters.minPricePerKmInUsd), LessThanOrEqual(filters.maxPricePerKmInUsd));
    } else if (filters.minPricePerKmInUsd) whereClause.pricePerKmInUsd = MoreThanOrEqual(filters.minPricePerKmInUsd);
    else if (filters.maxPricePerKmInUsd) whereClause.pricePerKmInUsd = LessThanOrEqual(filters.maxPricePerKmInUsd);

    if (filters.nearToGeolocation && JSON.stringify(filters.nearToGeolocation) !== "{}") {
      whereClause.geolocation = Raw(
        (columnAlias) =>
          `CAST(ST_DistanceSphere(ST_GeomFromText(ST_AsText(${columnAlias})), ST_MakePoint(:longitude, :latitude)) AS NUMERIC) <= :maxDistanceInKm * 1000`,
        filters.nearToGeolocation,
      );
    }

    const [drivers, total] = await this.repository.findAndCount({
      where: whereClause,
      take: filters.limit,
      skip: filters.offset,
    });

    return {
      data: drivers.map(driverMapper),
      meta: {
        limit: filters.limit,
        offset: filters.offset,
        total,
      },
    };
  }

  async create(entity: DriverCreate, transactionalManager?: TransactionalManager): Promise<Driver> {
    const repository = transactionalManager ? transactionalManager.getRepository(DriverEntity) : this.repository;

    const driver: DriverEntity = await repository.save({
      driverName: entity.driverName,
      carDescription: entity.carDescription,
      pricePerKmInUsd: entity.pricePerKmInUsd,
    });

    return driverMapper(driver);
  }

  async update(driverId: number, partialEntity: DriverUpdate, transactionalManager?: TransactionalManager): Promise<{ affected?: number }> {
    const definedValues: Partial<DriverEntity> = {};

    if (partialEntity.driverName) definedValues.driverName = partialEntity.driverName;
    if (partialEntity.driverStatus) definedValues.driverStatus = partialEntity.driverStatus;
    if (partialEntity.carDescription) definedValues.carDescription = partialEntity.carDescription;
    if (partialEntity.pricePerKmInUsd) definedValues.pricePerKmInUsd = partialEntity.pricePerKmInUsd;
    if (partialEntity.geolocation && JSON.stringify(partialEntity.geolocation) !== "{}") {
      definedValues.geolocation = geolocation2point(partialEntity.geolocation);
    }

    const repository = transactionalManager ? transactionalManager.getRepository(DriverEntity) : this.repository;
    return repository.update(driverId, definedValues);
  }
}

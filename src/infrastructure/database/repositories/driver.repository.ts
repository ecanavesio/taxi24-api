import { Driver } from "@app/domain/driver";
import { PagingRequest, PagingResult } from "@app/types/paging";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

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

  async find(filters: PagingRequest): Promise<PagingResult<Driver>> {
    const [drivers, total] = await this.repository.findAndCount({
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

  async create(entity: Partial<Driver>): Promise<Driver> {
    const driver: DriverEntity = await this.repository.save({
      driverName: entity.driverName,
      carDescription: entity.carDescription,
      pricePerKmInUsd: entity.pricePerKmInUsd,
    });

    return driverMapper(driver);
  }
}

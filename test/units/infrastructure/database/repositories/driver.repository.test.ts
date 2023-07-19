import { DriverEntity } from "@app/infrastructure/database/entities/driver.entity";
import { driverMapper } from "@app/infrastructure/database/mappers/driver.mapper";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { Repository } from "typeorm";

describe("DriverRepository", () => {
  let driverRepository: DriverRepository;
  let mockRepository: Partial<jest.Mocked<Repository<DriverEntity>>> & {
    findOne: jest.Mock;
    findAndCount: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      findAndCount: jest.fn(),
      save: jest.fn(),
    };

    driverRepository = new DriverRepository(mockRepository as Repository<DriverEntity>);
  });

  describe("getById", () => {
    it("should return the driver for a valid driverId", async () => {
      const driverId = 1;
      const driverEntity = {
        driverId: driverId,
        driverName: "John Doe",
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
      } as DriverEntity;
      const expectedDriver = driverMapper(driverEntity);

      mockRepository.findOne.mockResolvedValue(driverEntity);

      const result = await driverRepository.getById(driverId);

      expect(result).toEqual(expectedDriver);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { driverId } });
    });

    it("should return null for an invalid driverId", async () => {
      const invalidDriverId = 999;

      mockRepository.findOne.mockResolvedValue(null);

      const result = await driverRepository.getById(invalidDriverId);

      expect(result).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { driverId: invalidDriverId } });
    });
  });

  describe("find", () => {
    it("should return the drivers and metadata for valid filters", async () => {
      const filters = { limit: 10, offset: 0 };
      const driverEntities = [
        {
          driverId: 1,
          driverName: "John Doe",
          carDescription: "Toyota Corolla",
          pricePerKmInUsd: 0.5,
        } as DriverEntity,
        {
          driverId: 2,
          driverName: "Jane Doe",
          carDescription: "Honda Civic",
          pricePerKmInUsd: 0.4,
        } as DriverEntity,
      ];
      const expectedDrivers = driverEntities.map(driverMapper);
      const totalCount = driverEntities.length;

      mockRepository.findAndCount.mockResolvedValue([driverEntities, totalCount]);

      const result = await driverRepository.find(filters);

      expect(result.data).toEqual(expectedDrivers);
      expect(result.meta).toEqual({ limit: filters.limit, offset: filters.offset, total: totalCount });
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({ take: filters.limit, skip: filters.offset });
    });
  });

  describe("create", () => {
    it("should create and return the driver", async () => {
      const newDriver = {
        driverName: "John Doe",
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
      };
      const createdDriverEntity = {
        driverId: 1,
        driverName: "John Doe",
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
      } as DriverEntity;
      const expectedDriver = driverMapper(createdDriverEntity);

      mockRepository.save.mockResolvedValue(createdDriverEntity);

      const result = await driverRepository.create(newDriver);

      expect(result).toEqual(expectedDriver);
      expect(mockRepository.save).toHaveBeenCalledWith(newDriver);
    });
  });
});

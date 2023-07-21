import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { DriverUpdate } from "@app/domain/updates/driver.update";
import { DriverEntity } from "@app/infrastructure/database/entities/driver.entity";
import { driverMapper } from "@app/infrastructure/database/mappers/driver.mapper";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { geolocation2point } from "@app/utils";
import { And, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";

describe("DriverRepository", () => {
  let driverRepository: DriverRepository;
  let mockRepository: Partial<jest.Mocked<Repository<DriverEntity>>> & {
    findOne: jest.Mock;
    findOneOrFail: jest.Mock;
    findAndCount: jest.Mock;
    save: jest.Mock;
    update: jest.Mock;
  };

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      findOneOrFail: jest.fn(),
      findAndCount: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    driverRepository = new DriverRepository(mockRepository as Repository<DriverEntity>);
  });

  describe("getById", () => {
    it("should return the driver for a valid driverId", async () => {
      const driverId = 1;
      const driverEntity = {
        driverId: driverId,
        driverName: "John Doe",
        driverStatus: DriverStatus.AVAILABLE,
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

  describe("getByIdOrFail", () => {
    it("should return the driver with the specified driverId", async () => {
      const driverId = 1;
      const driverEntity = {
        driverId: driverId,
        driverName: "John Doe",
        driverStatus: DriverStatus.AVAILABLE,
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
      } as DriverEntity;
      const expectedDriver = driverMapper(driverEntity);

      mockRepository.findOneOrFail.mockResolvedValue(driverEntity);

      const result = await driverRepository.getByIdOrFail(driverId);

      expect(result).toEqual(expectedDriver);
      expect(mockRepository.findOneOrFail).toHaveBeenCalledWith({ where: { driverId } });
    });

    it("should throw an exception when driver with the specified driverId is not found", async () => {
      const driverId = 2;
      mockRepository.findOneOrFail.mockRejectedValueOnce(new Error("Driver not found"));
      expect(mockRepository.findOneOrFail(driverId)).rejects.toThrowError();
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
      expect(mockRepository.findAndCount).toHaveBeenCalledWith({ take: filters.limit, skip: filters.offset, where: {} });
    });

    it("should return drivers with matching driverStatus", async () => {
      const filters = { driverStatus: DriverStatus.AVAILABLE, limit: 10, offset: 0 };
      const whereClause: FindOptionsWhere<DriverEntity> = { driverStatus: DriverStatus.AVAILABLE };
      const drivers: DriverEntity[] = [
        { driverStatus: DriverStatus.AVAILABLE } as DriverEntity,
        { driverStatus: DriverStatus.AVAILABLE } as DriverEntity,
      ];
      const total = drivers.length;

      mockRepository.findAndCount.mockResolvedValueOnce([drivers, total]);

      const result = await driverRepository.find(filters);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith(expect.objectContaining({ where: whereClause }));
      expect(result).toEqual(expect.objectContaining({ data: drivers.map(driverMapper), meta: { limit: 10, offset: 0, total } }));
    });

    it("should return drivers with pricePerKmInUsd less than or equal to minPricePerKmInUsd", async () => {
      const filters = { minPricePerKmInUsd: 0.5, limit: 10, offset: 0 };

      const drivers: DriverEntity[] = [{ pricePerKmInUsd: 0.4 } as DriverEntity, { pricePerKmInUsd: 0.5 } as DriverEntity];
      const total = drivers.length;

      mockRepository.findAndCount.mockResolvedValueOnce([drivers, total]);

      const result = await driverRepository.find(filters);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            pricePerKmInUsd: MoreThanOrEqual(filters.minPricePerKmInUsd),
          }),
          skip: 0,
          take: 10,
        }),
      );
      expect(result).toEqual(expect.objectContaining({ data: drivers.map(driverMapper), meta: { limit: 10, offset: 0, total } }));
    });

    it("should return drivers with pricePerKmInUsd greater than or equal to maxPricePerKmInUsd", async () => {
      const filters = { maxPricePerKmInUsd: 0.5, limit: 10, offset: 0 };
      const drivers: DriverEntity[] = [{ pricePerKmInUsd: 0.5 } as DriverEntity, { pricePerKmInUsd: 0.6 } as DriverEntity];
      const total = drivers.length;

      mockRepository.findAndCount.mockResolvedValueOnce([drivers, total]);

      const result = await driverRepository.find(filters);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            pricePerKmInUsd: LessThanOrEqual(filters.maxPricePerKmInUsd),
          }),
          skip: 0,
          take: 10,
        }),
      );
      expect(result).toEqual(expect.objectContaining({ data: drivers.map(driverMapper), meta: { limit: 10, offset: 0, total } }));
    });

    it("should return drivers with pricePerKmInUsd between minPricePerKmInUsd and maxPricePerKmInUsd", async () => {
      const filters = { minPricePerKmInUsd: 0.3, maxPricePerKmInUsd: 0.8, limit: 10, offset: 0 };

      const drivers: DriverEntity[] = [{ pricePerKmInUsd: 0.4 } as DriverEntity, { pricePerKmInUsd: 0.5 } as DriverEntity];
      const total = drivers.length;

      mockRepository.findAndCount.mockResolvedValueOnce([drivers, total]);

      const result = await driverRepository.find(filters);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            pricePerKmInUsd: And(MoreThanOrEqual(filters.minPricePerKmInUsd), LessThanOrEqual(filters.maxPricePerKmInUsd)),
          }),
          skip: 0,
          take: 10,
        }),
      );
      expect(result).toEqual(expect.objectContaining({ data: drivers.map(driverMapper), meta: { limit: 10, offset: 0, total } }));
    });

    it("should return drivers near to the specified geolocation", async () => {
      const filters = {
        nearToGeolocation: { latitude: 10.0, longitude: 20.0, maxDistanceInKm: 5 },
        limit: 10,
        offset: 0,
      };
      const drivers: DriverEntity[] = [
        { geolocation: { type: "Point", coordinates: [19.0, 9.0] } } as DriverEntity,
        { geolocation: { type: "Point", coordinates: [21.0, 11.0] } } as DriverEntity,
      ];
      const total = drivers.length;

      mockRepository.findAndCount.mockResolvedValueOnce([drivers, total]);

      const result = await driverRepository.find(filters);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {
          geolocation: expect.anything(),
        },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual(expect.objectContaining({ data: drivers.map(driverMapper), meta: { limit: 10, offset: 0, total } }));
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

  describe("update", () => {
    it("should update the driver entity and return affected rows", async () => {
      const driverId = 1;
      const partialEntity: DriverUpdate = {
        driverName: "John Doe",
        driverStatus: DriverStatus.AVAILABLE,
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
        geolocation: { latitude: 10.0, longitude: 20.0 },
      };

      const definedValues: Partial<DriverEntity> = {
        driverName: partialEntity.driverName,
        driverStatus: partialEntity.driverStatus,
        carDescription: partialEntity.carDescription,
        pricePerKmInUsd: partialEntity.pricePerKmInUsd,
        geolocation: geolocation2point(partialEntity.geolocation!),
      };

      const affectedRows = 1; // Number of affected rows after update

      mockRepository.update.mockResolvedValue({ affected: affectedRows });

      const result = await driverRepository.update(driverId, partialEntity);

      expect(mockRepository.update).toHaveBeenCalledWith(driverId, definedValues);
      expect(result).toEqual({ affected: affectedRows });
    });
  });
});

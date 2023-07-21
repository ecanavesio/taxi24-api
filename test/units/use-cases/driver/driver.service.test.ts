import { Driver } from "@app/domain/driver";
import { DriverStatus } from "@app/domain/enum/driver-status.enum";
import { DriverRepository } from "@app/infrastructure/database/repositories/driver.repository";
import { PagingResult } from "@app/types";
import { DriverService } from "@app/use-cases/driver/driver.service";
import { CreateDriverDto } from "@app/use-cases/driver/dto/create-driver.dto";
import { FilterDriversDto } from "@app/use-cases/driver/dto/filter-drivers.dto";
import { NewGeolocationDto } from "@app/use-cases/driver/dto/new-geolocation.dto";
import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

describe("DriverService", () => {
  let driverService: DriverService;
  let driverRepository: DriverRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: DriverRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    driverService = module.get<DriverService>(DriverService);
    driverRepository = module.get<DriverRepository>(DriverRepository);
  });

  describe("createDriver", () => {
    it("should create a new driver", async () => {
      const createDriverDto: CreateDriverDto = {
        driverName: "John Doe",
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
      };

      const createdDriver: Driver = {
        driverId: 1,
        driverName: "John Doe",
        driverStatus: DriverStatus.AVAILABLE,
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
        geolocation: null,
      };

      jest.spyOn(driverRepository, "create").mockResolvedValueOnce(createdDriver);

      const result = await driverService.createDriver(createDriverDto);

      expect(result).toEqual(createdDriver);
      expect(driverRepository.create).toHaveBeenCalledWith(createDriverDto);
    });
  });

  describe("getDrivers", () => {
    it("should return a list of drivers", async () => {
      const filters: FilterDriversDto = {
        limit: 10,
        offset: 0,
        driverStatus: DriverStatus.AVAILABLE,
        maxPricePerKmInUsd: 1.0,
      };

      const drivers: Driver[] = [
        {
          driverId: 1,
          driverName: "John Doe",
          driverStatus: DriverStatus.AVAILABLE,
          carDescription: "Toyota Corolla",
          pricePerKmInUsd: 0.5,
          geolocation: null,
        },
      ];

      const pagingResult: PagingResult<Driver> = {
        data: drivers,
        meta: {
          limit: 10,
          offset: 0,
          total: 1,
        },
      };

      jest.spyOn(driverRepository, "find").mockResolvedValueOnce(pagingResult);

      const result = await driverService.getDrivers(filters);

      expect(result).toEqual(pagingResult);
      expect(driverRepository.find).toHaveBeenCalledWith(filters);
    });
  });

  describe("getDriverById", () => {
    it("should return the driver with the specified id", async () => {
      const driverId = 1;

      const driver: Driver = {
        driverId: 1,
        driverName: "John Doe",
        driverStatus: DriverStatus.AVAILABLE,
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
        geolocation: null,
      };

      jest.spyOn(driverRepository, "getById").mockResolvedValueOnce(driver);

      const result = await driverService.getDriverById(driverId);

      expect(result).toEqual(driver);
      expect(driverRepository.getById).toHaveBeenCalledWith(driverId);
    });

    it("should throw NotFoundException when driver is not found", async () => {
      const driverId = 999;

      jest.spyOn(driverRepository, "getById").mockResolvedValueOnce(null);

      await expect(driverService.getDriverById(driverId)).rejects.toThrowError(NotFoundException);
      expect(driverRepository.getById).toHaveBeenCalledWith(driverId);
    });
  });

  describe("updateGeolocation", () => {
    it("should update the driver geolocation", async () => {
      const driverId = 1;
      const geolocation: NewGeolocationDto = {
        latitude: 10.0,
        longitude: 20.0,
      };

      const driver = {
        driverId: 1,
        driverName: "John Doe",
        driverStatus: DriverStatus.AVAILABLE,
        carDescription: "Toyota Corolla",
        pricePerKmInUsd: 0.5,
        geolocation: { latitude: 30.0, longitude: 40.0 },
      } as Driver;

      jest.spyOn(driverRepository, "getById").mockResolvedValue(driver);

      await driverService.updateGeolocation(driverId, geolocation);

      expect(driverRepository.getById).toHaveBeenCalledWith(driverId);
      expect(driverRepository.update).toHaveBeenCalledWith(driverId, { geolocation });
    });

    it("should throw NotFoundException if driver not found", async () => {
      const driverId = 1;
      const geolocation: NewGeolocationDto = {
        latitude: 10.0,
        longitude: 20.0,
      };

      jest.spyOn(driverRepository, "getById").mockResolvedValue(null);

      await expect(driverService.updateGeolocation(driverId, geolocation)).rejects.toThrow(NotFoundException);

      expect(driverRepository.getById).toHaveBeenCalledWith(driverId);
      expect(driverRepository.update).not.toHaveBeenCalled();
    });
  });
});

import { Geolocation } from "@app/domain/geolocation";
import { geolocation2point, point2geolocation } from "@app/utils";
import { Point } from "typeorm";

describe("Geolocation Converter", () => {
  describe("point2geolocation", () => {
    it("should convert Point to Geolocation", () => {
      const point: Point = {
        type: "Point",
        coordinates: [10.123, 20.456],
      };
      const expectedGeolocation = new Geolocation(20.456, 10.123);

      const result = point2geolocation(point);

      expect(result).toEqual(expectedGeolocation);
    });
  });

  describe("geolocation2point", () => {
    it("should convert Geolocation to Point", () => {
      const geolocation = new Geolocation(20.456, 10.123);
      const expectedPoint: Point = {
        type: "Point",
        coordinates: [10.123, 20.456],
      };

      const result = geolocation2point(geolocation);

      expect(result).toEqual(expectedPoint);
    });
  });
});

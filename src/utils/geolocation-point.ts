import { Geolocation } from "@app/domain/geolocation";
import { Point } from "typeorm";

export function point2geolocation(point: Point): Geolocation {
  return new Geolocation(point.coordinates[1], point.coordinates[0]);
}

export function geolocation2point(geolocation: Geolocation): Point {
  return {
    type: "Point",
    coordinates: [geolocation.longitude, geolocation.latitude],
  };
}

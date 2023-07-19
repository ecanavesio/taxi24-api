import { Point } from "typeorm";

export class Geolocation {
  constructor(
    public latitude: number,
    public longitude: number,
  ) {}

  static fromPoint(point: Point): Geolocation {
    return new Geolocation(point.coordinates[1], point.coordinates[0]);
  }
}

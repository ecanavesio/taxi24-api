import { Geolocation } from "@app/domain/geolocation";

export function calculateGeodistance(from: Geolocation, to: Geolocation): number {
  // Convert latitude and longitude from degrees to radians
  const lat1Rad: number = toRadians(from.latitude);
  const lon1Rad: number = toRadians(from.longitude);
  const lat2Rad: number = toRadians(to.latitude);
  const lon2Rad: number = toRadians(to.longitude);

  // Radius of the Earth in kilometers
  const radius: number = 6371;

  // Haversine formula
  const dlat: number = lat2Rad - lat1Rad;
  const dlon: number = lon2Rad - lon1Rad;
  const a: number = Math.sin(dlat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance: number = radius * c;

  return distance;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

import { calculateGeodistance } from "@app/utils/geodistance";

describe("calculateGeodistance", () => {
  const fromLocation = { latitude: 52.52, longitude: 13.405 };
  const toLocation = { latitude: 48.8566, longitude: 2.3522 };

  it("should calculate the geodistance correctly between two locations", () => {
    // Manually calculated expected distance between Berlin and Paris (in kilometers)
    const expectedDistance = 877.463;

    const result = calculateGeodistance(fromLocation, toLocation);

    expect(result).toBeCloseTo(expectedDistance, 3);
  });

  it("should return 0 when calculating the distance between the same location", () => {
    const result = calculateGeodistance(fromLocation, fromLocation);

    expect(result).toBe(0);
  });

  it("should handle negative longitudes correctly", () => {
    const fromLocationWithNegativeLongitude = { latitude: 52.52, longitude: -13.405 };
    const toLocationWithNegativeLongitude = { latitude: 48.8566, longitude: -2.3522 };

    // Manually calculated expected distance between Berlin and Paris with negative longitudes (in kilometers)
    const expectedDistance = 877.463;

    const result = calculateGeodistance(fromLocationWithNegativeLongitude, toLocationWithNegativeLongitude);

    expect(result).toBeCloseTo(expectedDistance, 2);
  });
});

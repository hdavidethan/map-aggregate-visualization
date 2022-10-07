import * as fs from "fs";

interface IGeolocation {
  lat: number;
  lng: number;
}

interface IParking extends IGeolocation {
  parking: Array<number>;
}

function convertMetersToDegrees(distance: number): number {
  return distance / 111300;
}

function generateLocation(): IGeolocation {
  const CENTER = { lat: 40.4511, lng: -79.9338 };
  const RADIUS = 1000;

  const u = Math.random();
  const v = Math.random();

  const radiusDegrees = convertMetersToDegrees(RADIUS);

  const w = radiusDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xPrime = x / Math.cos(CENTER.lat);
  return { lat: CENTER.lat + y, lng: CENTER.lng + xPrime };
}

function generateParkingData(periodMins: number): Array<number> {
  const parkingProbs = [
    // 12 1230 1      130   2    230   3    330    4    430    5   530    6
    0.25, 0.23, 0.18, 0.15, 0.1, 0.06, 0.05, 0.03, 0.05, 0.09, 0.1, 0.15, 0.18,
    // 630 7   730  8     830   9    930   10    1030  11    1130  12    1230
    0.25, 0.3, 0.4, 0.45, 0.47, 0.5, 0.52, 0.59, 0.62, 0.79, 0.87, 0.91, 0.93,
    // 13 1330  14    1430  15    1530  16   1630  1700  1730  1800  1830 19
    0.98, 0.97, 0.98, 0.95, 0.96, 0.93, 0.9, 0.86, 0.7, 0.65, 0.59, 0.5, 0.42,
    // 1930 20  2030  21  2130   22   2230   23    2330
    0.42, 0.4, 0.36, 0.3, 0.34, 0.28, 0.27, 0.26, 0.25,
  ];
  const result: Array<number> = [];
  const n = (24 * 60) / periodMins;
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    result.push(u > parkingProbs[i] ? 1 : 0);
  }
  return result;
}

function generateNLocations(n: number): Array<IParking> {
  const result: Array<IParking> = [];
  for (let i = 0; i < n; i++) {
    result.push({ ...generateLocation(), parking: generateParkingData(30) });
  }
  return result;
}

function writeToFile(): void {
  fs.writeFileSync("locations.json", JSON.stringify(generateNLocations(200)));
}

writeToFile();

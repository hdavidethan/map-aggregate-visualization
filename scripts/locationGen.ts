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
  const result: Array<number> = [];
  const n = (24 * 60) / periodMins;
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    result.push(u > 0.5 ? 1 : 0);
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

import { Coordinates } from "./Coordinates";

export interface ParkingData extends Coordinates {
  parking: Array<number>;
}

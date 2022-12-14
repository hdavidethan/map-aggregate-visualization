import { Coordinates } from "./Coordinates";

export interface MarkerData extends Coordinates {
  parking: Array<number>;
}

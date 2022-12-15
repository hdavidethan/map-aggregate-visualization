import { Coordinates } from "./Coordinates";

export interface SearchQuery {
  query: string;
  timestamp: number;
}

export interface MarkerData extends Coordinates {
  parking: Array<number>;
  searchQueries: Array<SearchQuery>;
  noise: number;
}

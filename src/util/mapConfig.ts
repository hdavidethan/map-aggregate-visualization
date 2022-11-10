import { Coordinates } from "../components/MapContainer/Coordinates";
import mapConfig from "../map_config.json";

export function getMapCenter(): Coordinates {
  return mapConfig.center;
}

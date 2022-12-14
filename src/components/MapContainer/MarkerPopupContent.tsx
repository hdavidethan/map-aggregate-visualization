import { useAppSelector } from "../../hooks";
import { halfHourToTimeString } from "../../util/halfHourUtils";
import QueryType from "../QuerySection/QueryType";
import { MarkerData } from "./MarkerData";

interface Props {
  marker: MarkerData;
  halfHourIndex: number;
  occupied: boolean;
}

function MarkerPopupContent({ marker, halfHourIndex, occupied }: Props) {
  const queryConfiguration = useAppSelector(
    (state) => state.queryConfiguration
  );
  switch (QueryType[queryConfiguration.queryType]) {
    case QueryType[QueryType.AGGREGATED_PARKING_HISTOGRAM]:
    case QueryType[QueryType.REAL_TIME_PARKING]:
      return (
        <>
          <p className="my-0">Latitude: {marker.lat}</p>
          <p className="my-0">Longitude: {marker.lng}</p>
          <p className="my-0">Time: {halfHourToTimeString(halfHourIndex)}</p>
          <p className="my-0">
            Parking Status: {occupied ? "Occupied" : "Vacant"}
          </p>
        </>
      );
    default:
      return <p>Not implemented</p>;
  }
}

export default MarkerPopupContent;

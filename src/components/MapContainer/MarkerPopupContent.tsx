import { useAppSelector } from "../../hooks";
import { halfHourToTimeString } from "../../util/halfHourUtils";
import QueryType from "../QuerySection/QueryType";
import { MarkerData } from "./MarkerData";

interface Props {
  marker: MarkerData;
  halfHourIndex: number;
}

function MarkerPopupContent({ marker, halfHourIndex }: Props) {
  const queryConfiguration = useAppSelector(
    (state) => state.queryConfiguration
  );
  switch (QueryType[queryConfiguration.queryType]) {
    case QueryType[QueryType.AGGREGATED_PARKING_HISTOGRAM]:
    case QueryType[QueryType.REAL_TIME_PARKING]: {
      const occupied = marker.parking[halfHourIndex] === 0;
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
    }
    case QueryType[QueryType.NOISE_MAP]: {
      return (
        <>
          <p className="my-0">Latitude: {marker.lat}</p>
          <p className="my-0">Longitude: {marker.lng}</p>
          <p className="my-0">Noise Level: {marker.noise}</p>
        </>
      );
    }
    case QueryType[QueryType.TRENDS]: {
      return (
        <>
          <p className="my-0">Latitude: {marker.lat}</p>
          <p className="my-0">Longitude: {marker.lng}</p>
          <br />
          <table>
            {marker.searchQueries
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((query) => (
                <tr
                  key={`popup-table-${marker.lat},${marker.lng}-${query.timestamp}`}
                >
                  <td>{new Date(query.timestamp).toLocaleString("en-US")}</td>
                  <td>{query.query}</td>
                </tr>
              ))}
          </table>
        </>
      );
    }
    default:
      return <p>Not implemented</p>;
  }
}

export default MarkerPopupContent;

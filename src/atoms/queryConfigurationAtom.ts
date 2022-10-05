import { atom, useRecoilState } from "recoil";
import QueryType from "../components/QuerySection/QueryType";

type ParameterValue = number | string;

export type QueryConfiguration = {
  queryType: QueryType;
  parameters: {
    [key: string]: ParameterValue;
  };
};

export const defaultParameters: {
  [key in QueryType]: { [key: string]: ParameterValue };
} = {
  [QueryType.REAL_TIME_PARKING]: {
    lat: 40.451,
    lng: -79.935,
    radius: 300,
  },
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
    lat: 40.451,
    lng: -79.935,
    radius: 300,
  },
};

const queryConfigurationAtom = atom<QueryConfiguration>({
  key: "QUERY_CONFIGURATION",
  default: { queryType: QueryType.REAL_TIME_PARKING, parameters: {} },
});

export function useQueryConfiguration(): [
  QueryConfiguration,
  (queryType: QueryType) => void,
  (parameterName: string, value: ParameterValue) => void
] {
  const [queryConfiguration, setQueryConfiguration] = useRecoilState(
    queryConfigurationAtom
  );

  function setQueryType(queryType: QueryType) {
    setQueryConfiguration({
      ...queryConfiguration,
      queryType,
    });
  }

  function setQueryParameter(parameterName: string, value: ParameterValue) {
    setQueryConfiguration({
      ...queryConfiguration,
      parameters: {
        ...queryConfiguration.parameters,
        [parameterName]: value,
      },
    });
  }

  return [queryConfiguration, setQueryType, setQueryParameter];
}

export default queryConfigurationAtom;

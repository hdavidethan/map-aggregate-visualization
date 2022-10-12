import { atom, useRecoilState } from "recoil";
import QueryType from "../components/QuerySection/QueryType";
import queryInterfaceConfiguration from "./queryInterfaceConfiguration";

export type ParameterValue = number | string;

export type QueryConfiguration = {
  queryType: QueryType;
  parameters: {
    [key: string]: ParameterValue;
  };
};

type DefaultQueryParameters = {
  [key in QueryType]: { [key: string]: ParameterValue };
};

export const defaultParameters: DefaultQueryParameters = Object.keys(
  queryInterfaceConfiguration
).reduce<DefaultQueryParameters>((acc, key) => {
  const config =
    queryInterfaceConfiguration[
      Number(key) as keyof typeof queryInterfaceConfiguration
    ];

  const result: { [key: string]: ParameterValue } = {};
  for (const row of config) {
    for (const param of row.parameters) {
      result[param.name] = param.default;
    }
  }

  acc[Number(key) as keyof typeof queryInterfaceConfiguration] = result;
  return acc;
}, Object.create(QueryType));

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

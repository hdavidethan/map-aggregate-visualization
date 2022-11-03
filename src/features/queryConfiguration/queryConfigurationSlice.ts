import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QueryType from "../../components/QuerySection/QueryType";
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

const initialState: QueryConfiguration = {
  queryType: QueryType.REAL_TIME_PARKING,
  parameters: {},
};

export const queryConfigurationSlice = createSlice({
  name: "queryConfiguration",
  initialState,
  reducers: {
    setQueryType: (state, action: PayloadAction<QueryType>) => {
      state.queryType = action.payload;
    },
    setParameterValue: (
      state,
      action: PayloadAction<[string, ParameterValue]>
    ) => {
      const [parameter, value] = action.payload;
      state.parameters = {
        ...state.parameters,
        [parameter]: value,
      };
    },
  },
});

export const { setQueryType, setParameterValue } =
  queryConfigurationSlice.actions;

export default queryConfigurationSlice.reducer;

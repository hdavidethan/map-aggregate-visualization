import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QueryType from "../../components/QuerySection/QueryType";
import { serviceConfiguration } from "./serviceConfiguration";

interface ServiceURLConfiguration {
  usingExternalService: boolean;
  serviceUrl: string;
}

export type ServiceConfiguration = {
  [key in QueryType]: ServiceURLConfiguration;
};

export const serviceConfigurationSlice = createSlice({
  name: "serviceConfiguration",
  initialState: serviceConfiguration,
  reducers: {
    setUsingExternalService: (
      state,
      action: PayloadAction<[QueryType, boolean]>
    ) => {
      const [queryType, value] = action.payload;
      state[queryType].usingExternalService = value;
    },
    setServiceUrl: (state, action: PayloadAction<[QueryType, string]>) => {
      const [queryType, value] = action.payload;
      state[queryType].serviceUrl = value;
    },
  },
});

export const { setUsingExternalService, setServiceUrl } =
  serviceConfigurationSlice.actions;

export default serviceConfigurationSlice.reducer;

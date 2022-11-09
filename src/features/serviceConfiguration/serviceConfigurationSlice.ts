import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import QueryType from "../../components/QuerySection/QueryType";

interface ServiceURLConfiguration {
  usingExternalService: boolean;
  serviceUrl: string;
}

type ServiceConfiguration = {
  [key in QueryType]: ServiceURLConfiguration;
};

const initialState: ServiceConfiguration = {
  [QueryType.REAL_TIME_PARKING]: {
    usingExternalService: false,
    serviceUrl: "",
  },
  [QueryType.AGGREGATED_PARKING_HISTOGRAM]: {
    usingExternalService: false,
    serviceUrl:
      "https://19mg8qtqsk.execute-api.us-east-2.amazonaws.com/Prod/execute",
  },
  [QueryType.NOISE_MAP]: {
    usingExternalService: false,
    serviceUrl: "",
  },
  [QueryType.TRENDS]: {
    usingExternalService: false,
    serviceUrl: "",
  },
};

export const serviceConfigurationSlice = createSlice({
  name: "serviceConfiguration",
  initialState,
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

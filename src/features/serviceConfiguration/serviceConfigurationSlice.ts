import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceConfiguration {
  usingExternalService: boolean;
  serviceUrl: string;
}

const initialState: ServiceConfiguration = {
  usingExternalService: false,
  serviceUrl:
    "https://19mg8qtqsk.execute-api.us-east-2.amazonaws.com/Prod/execute",
};

export const serviceConfigurationSlice = createSlice({
  name: "serviceConfiguration",
  initialState,
  reducers: {
    setUsingExternalService: (state, action: PayloadAction<boolean>) => {
      state.usingExternalService = action.payload;
    },
    setServiceUrl: (state, action: PayloadAction<string>) => {
      state.serviceUrl = action.payload;
    },
  },
});

export const { setUsingExternalService, setServiceUrl } =
  serviceConfigurationSlice.actions;

export default serviceConfigurationSlice.reducer;

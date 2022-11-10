import { configureStore } from "@reduxjs/toolkit";
import lambdaDataReducer from "./features/lambdaData/lambdaDataSlice";
import queryConfigurationReducer from "./features/queryConfiguration/queryConfigurationSlice";
import serviceConfigurationReducer from "./features/serviceConfiguration/serviceConfigurationSlice";

const store = configureStore({
  reducer: {
    queryConfiguration: queryConfigurationReducer,
    serviceConfiguration: serviceConfigurationReducer,
    lambdaData: lambdaDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

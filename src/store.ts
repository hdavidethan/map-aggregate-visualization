import { configureStore } from "@reduxjs/toolkit";
import queryConfigurationReducer from "./features/queryConfiguration/queryConfigurationSlice";
import serviceConfigurationReducer from "./features/serviceConfiguration/serviceConfigurationSlice";

const store = configureStore({
  reducer: {
    queryConfiguration: queryConfigurationReducer,
    serviceConfiguration: serviceConfigurationReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

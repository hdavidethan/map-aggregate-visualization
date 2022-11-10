import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coordinates } from "../../components/MapContainer/Coordinates";

export const lambdaDataSlice = createSlice({
  name: "lambdaData",
  initialState: [] as Array<Coordinates>,
  reducers: {
    setLambdas: (state, action: PayloadAction<Array<Coordinates>>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setLambdas } = lambdaDataSlice.actions;

export default lambdaDataSlice.reducer;

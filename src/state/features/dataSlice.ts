import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IData {
  [date: string]: {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
}

interface InitialState {
  /**
   * The data for the scope
   */
  data: {
    // NOTE The date is in date format "YYYY-MM-DD HH:MM:SS"
    [date: string]: IData;
  };
}

const dt = new Date();

console.log(
  `${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
    .getDate()
    .toString()
    .padStart(2, "0")}/${dt.getFullYear().toString().padStart(4, "0")} ${dt
    .getHours()
    .toString()
    .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
    .getSeconds()
    .toString()
    .padStart(2, "0")}`
);

const initialState: InitialState = {
  data: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    /**
     * Adds a new data point
     * @param state
     * @param param1
     */
    addData: (
      state: InitialState,
      { payload: data }: PayloadAction<IData>
    ) => {},
  },
});

export default dataSlice.reducer;

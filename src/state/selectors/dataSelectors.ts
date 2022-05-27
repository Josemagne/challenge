import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectData = (store: RootState) => store.dataReducer.data;
export const dataSelector = createSelector(selectData, (d) => d);

/**
 * Selects the last entry point of the fetched data
 */
export const lastDataSelector = createSelector(selectData, (s) => {
  const dataArray = Object.values(s);
  return dataArray[dataArray.length - 1];
});

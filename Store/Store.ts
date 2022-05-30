import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: { list: listSlice, filter: filterSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

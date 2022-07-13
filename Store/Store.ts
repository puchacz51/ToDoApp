import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import filterSlice from "./filterSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";

const pListConfig = {
  key: "list",
  storage: storage,
  blacklist: ["editedTask", "addedForm"],
};
const pFilterConfig = {
  key: "filer",
  storage: sessionStorage,
};
const pListReducer = persistReducer(pListConfig, listSlice);
const pFilterReducer = persistReducer(pFilterConfig, filterSlice);
const rootReducer = combineReducers({
  list: pListReducer,
  filter: pFilterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
export const pStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

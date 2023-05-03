import { combineReducers, configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice";
import filterSlice from "./filterSlice";
import thunk from "redux-thunk";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import supabaseSlice from "./supabaseSlice";
import taskApi from "./taskApi";
import { createWrapper } from "next-redux-wrapper";


const rootReducer = combineReducers({
  list: listSlice,
  filter: filterSlice,
  supabase: supabaseSlice,
  [taskApi.reducerPath]: taskApi.reducer,
});

 const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ["supabase"],
          ignoredActionPaths: ["payload.supabase"],
        },
      })
        .concat(taskApi.middleware)
        .concat([thunk]),
  });
export const  wrapper = createWrapper(makeStore)
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  createBrowserSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { HYDRATE } from "next-redux-wrapper";
type SupabaseSlice = {
  supabaseClient: null | SupabaseClient;
  supbaseSession: null | Session;
};
const initialState: SupabaseSlice = {
  supabaseClient:
    typeof window !== "undefined" ? createBrowserSupabaseClient() : null,
  supbaseSession: null,
};
const supabaseSlice = createSlice({
  name: "supabase",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.supbaseSession = action.payload;
      return state;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload.supabase,
      };
    },
  },
});
export default supabaseSlice.reducer;
export const { setSession } = supabaseSlice.actions;

import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../SupaBase/supabase";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getUserTasks: build.query({
      queryFn: async (userId: string) => {
        try {
          const tasksResponse = await supabase
            .from("tasks")
            .select("*")
            .eq(userId, "user_id");
          const { count, data, error } = tasksResponse;
          if (error) throw error;
          if (count) throw new Error("no Data");
          return { data: data };
        } catch (err) {
          return { error: err };
        }
      },
    }),
  }),
});

export const { useGetUserTasksQuery } = taskApi;

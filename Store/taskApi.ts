import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "../SupaBase/supabase";
import { Task } from "../types";
import { Database } from "../SupaBase/schema";
import { setEditedTask } from "./listSlice";

type taskInstert = Database["public"]["Tables"]["tasks"]["Insert"];

const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["taskList"],
  endpoints: (build) => ({
    getUserTasks: build.query({
      queryFn: async (userId: string) => {
        try {
          const tasksResponse = await supabase
            .from("tasks")
            .select("*")
            .eq("user_id", userId)
            .order("completed_at", { ascending: false })
            .order("created_at", { ascending: false });
          console.log("next call s");
          const { count, data, error } = tasksResponse;
          if (error) throw error;
          return { data: data };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: (_result, _, userId) => [{ type: "taskList", id: userId }],
    }),
    toggleIsCompleted: build.mutation({
      queryFn: async ({
        taskId,
        completed,
      }: {
        taskId: string;
        completed: boolean;
        userId: string;
      }) => {
        const newTaskData = completed ? null : new Date().toUTCString();
        const { data } = await supabase
          .from("tasks")
          .update({ completed_at: newTaskData })
          .eq("id", taskId);
        return { data: data };
      },
      onQueryStarted: (
        {
          taskId,
          completed,
          userId,
        }: { taskId: string; completed: boolean; userId: string },
        { dispatch, queryFulfilled }
      ) => {
        const newTaskData = completed ? null : new Date().toUTCString();
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getUserTasks", userId, (draft) => {
            if (draft?.length) {
              const updatedTaskId = draft.findIndex(
                (task) => task.id === taskId
              );
              draft[updatedTaskId].completed_at = newTaskData;
            }
            return draft;
          })
        );
        queryFulfilled
          .catch(patchResult.undo)
          .then(() =>
            taskApi.util.invalidateTags([{ type: "taskList", id: userId }])
          );
      },
    }),
    addNewTask: build.mutation({
      queryFn: async (newTask: taskInstert) => {
        const { data } = await supabase.from("tasks").insert(newTask);
        return { data: { data } };
      },
      onQueryStarted: (
        newTask: taskInstert,
        { dispatch, queryFulfilled, getCacheEntry, getState }
      ) => {
        const { user_id } = newTask;
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getUserTasks", user_id, (draft) => {
            if (draft?.length) {
              const newTempTask: Task = {
                ...newTask,
                id: "tempID",
                created_at: new Date().toUTCString(),
              } as Task;
              draft.unshift(newTempTask);
            }
            return draft;
          })
        );
        dispatch(setEditedTask(null));
        queryFulfilled
          .catch(patchResult.undo)
          .then(() =>
            taskApi.util.invalidateTags([{ type: "taskList", id: user_id }])
          );
      },
    }),
    deleteTask: build.mutation({
      queryFn: async ({
        taskId,
        user_id,
      }: {
        taskId: string;
        user_id: string;
      }) => {
        const { data } = await supabase.from("tasks").delete().eq("id", taskId);
        return { data: { data } };
      },
      onQueryStarted: (
        { taskId, user_id },
        { dispatch, queryFulfilled, getCacheEntry, getState }
      ) => {
        const patchResult = dispatch(
          taskApi.util.updateQueryData("getUserTasks", user_id, (draft) => {
            if (draft?.length) {
              const deletingTaskId = draft.findIndex(
                (task) => task.id === taskId
              );
              draft[deletingTaskId].title = "deleting ... ";
            }
            return draft;
          })
        );
        queryFulfilled.catch(patchResult.undo).then(() => {
          console.log(user_id, "deleting");

          taskApi.util.invalidateTags([{ type: "taskList", id: user_id }]);
        });
      },
    }),
  }),
});

export const {
  useGetUserTasksQuery,
  useToggleIsCompletedMutation,
  useAddNewTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
export default taskApi;

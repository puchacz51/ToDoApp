import { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useAppSelector, wrapper } from "../Store/Store";
import { setSession } from "../Store/supabaseSlice";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useGetUserTasksQuery } from "../Store/taskApi";
import ToDoItemsList from "../components/TodoApp/TodoItemList";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const serverClient = createServerSupabaseClient(ctx);
    const sessionData = await serverClient.auth.getSession();
    store.dispatch(setSession(sessionData.data.session));
    return { props: {} };
  }
);

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   return { props: {} };
// };
const Test = () => {
  const { supbaseSession } = useAppSelector((state) => state.supabase);
  const store = useAppSelector((state) => state);
  const { user } = supbaseSession || { user: null };
  const { data } = useGetUserTasksQuery((user as User)?.id);

  return (
    <div>
      <h2>testowe</h2>
      <h3>userId:{user?.id}</h3>
      {data && <ToDoItemsList taskList={data} />}
    </div>
  );
};

export default Test;

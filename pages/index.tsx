import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import ToDoApp from "../components/TodoApp/ToDoApp";
import { useAppSelector, wrapper } from "../Store/Store";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { setSession } from "../Store/supabaseSlice";
import { useRouter } from "next/router";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const dispatch = store.dispatch;
    const serverClient = createServerSupabaseClient(ctx);
    const { data: sessionData } = await serverClient.auth.getSession();
    if (!sessionData.session)
      return { redirect: { destination: "/login", permanent: false } };
    dispatch(setSession(sessionData.session));
    return { props: {} };
  }
);
const Home = () => {
  const router = useRouter();
  const { supbaseSession } = useAppSelector((state) => state.supabase);
  if (!supbaseSession?.access_token) {
    router.push("/login");

    return <></>;
  }
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ToDoApp></ToDoApp>
    </>
  );
};

export default Home;

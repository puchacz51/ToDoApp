import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import ToDoApp from "../components/TodoApp/ToDoApp";

const Home: NextPage = () => {
  return (
    <>
      <ToDoApp></ToDoApp>
      <Head>
        <title>Todo App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  );
};

export default Home;

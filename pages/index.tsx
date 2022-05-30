import type { NextPage } from "next";
import React from "react";
import ToDoApp from "../components/TodoApp/ToDoApp";
import { store } from "../Store/Store";
import { Provider } from "react-redux";

const Home: NextPage = () => {
  return (
    <Provider store={store}>
      <ToDoApp></ToDoApp>
    </Provider>
  );
};

export default Home;

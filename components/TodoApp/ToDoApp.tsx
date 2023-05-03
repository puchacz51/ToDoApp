import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../Store/Store";
import { toggleAddedForm } from "../../Store/listSlice";
import { Category } from "../../types";
import React from "react";
import FilterTasks from "./FilterTasks";
import styles from "../../styles/ToDo.module.scss";
import AddForm from "./AddForm";
import ToDoItemsList from "./TodoItemList";
import { Session } from "@supabase/supabase-js";
import { useGetUserTasksQuery } from "../../Store/taskApi";

const SelectTasks = () => {
  const { list } = useAppSelector((state) => state);
  const { user } = useAppSelector(
    (state) => state.supabase.supbaseSession
  ) as Session;
  const { categoriesOption, addedForm, tasks } = list;
  const {
    data: tasksList,
    isLoading,
    isError,
    isFetching,
  } = useGetUserTasksQuery(user.id);
  const dispatch = useDispatch();

  return (
    <div className={styles.toDoAppContainerWrapper}>
      <div className={styles.toDoAppContainer}>
        <div className={styles.containerAddTask}>
          <h3>Create new Task :</h3>
          <button
            className={`${styles.create} ${styles.icon}`}
            onClick={() => dispatch(toggleAddedForm())}
          >
            +
          </button>
        </div>
        {addedForm && <AddForm />}

        <FilterTasks
          categoriesOption={categoriesOption as Category[]}
        ></FilterTasks>

        {tasksList && (
          <ToDoItemsList key={tasksList.length} taskList={tasksList} />
        )}
      </div>
    </div>
  );
};

export default SelectTasks;

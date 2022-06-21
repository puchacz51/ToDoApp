import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { toggleAddedForm } from "../../Store/listSlice";
import { Category } from "../../types";
import React from "react";
import FilterTasks from "./FilterTasks";
import ToDoItemsList from "./TodoItemList";
import styles from "../../styles/ToDo.module.scss";
import AddForm from "./AddForm";
import ViewTask from "./ViewTask";
import { useState } from "react";

const SelectTasks: React.FC = () => {
  const { filter, list } = useSelector((state: RootState) => state);
  const [filterHidden, setFilterHidden] = useState<boolean>(false);
  const { editedTask, categoriesOption, addedForm } = list;
  const dispatch = useDispatch();
  return (
    <div className={styles.tasks}>
      <div className={styles.containerAddTask}>
        <h3>Create new Task :</h3>
        <button
          className={`${styles.create} ${styles.icon}`}
          onClick={() => dispatch(toggleAddedForm())}
        >
          +
        </button>
      </div>

      <FilterTasks
        categoriesOption={categoriesOption as Category[]}
      ></FilterTasks>
      <ToDoItemsList />

      {editedTask && <ViewTask />}
      {addedForm && <AddForm />}
    </div>
  );
};

export default SelectTasks;

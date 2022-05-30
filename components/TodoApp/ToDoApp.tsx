import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { toggleAddedForm } from "../../Store/listSlice";
import { Category } from "../../types";
import React from "react";
import FilterTasks from "./FilterTasks";
import { ToDoItemList, ToDoItemListComplted } from "./TodoItemList";
import styles from "../../styles/ToDo.module.css";
import AddForm from "./AddForm";
import ViewTask from "./ViewTask";

const SelectTasks: React.FC = () => {
  const { filter, list } = useSelector((state: RootState) => state);
  const { editedTask, categoriesOption, addedForm } = list;
  const { selectedStatus } = filter;
  const dispatch = useDispatch();
  return (
    <div className={styles.tasks}>
      <h3>Create new Task :</h3>
      <button
        className={`${styles.create} ${styles.icon}`}
        onClick={() => dispatch(toggleAddedForm())}
      >
        +
      </button>
      <FilterTasks
        categoriesOption={categoriesOption as Category[]}
      ></FilterTasks>
      {(selectedStatus == "active" || selectedStatus == "both") && (
        <>
          <ToDoItemList />
        </>
      )}
      {(selectedStatus == "completed" || selectedStatus == "both") && (
        <>
          <ToDoItemListComplted />
        </>
      )}
      {editedTask && <ViewTask />}
      {addedForm && <AddForm />}
    </div>
  );
};

export default SelectTasks;

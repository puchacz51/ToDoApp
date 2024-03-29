import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { toggleAddedForm } from "../../Store/listSlice";
import { Category } from "../../types";
import React from "react";
import FilterTasks from "./FilterTasks";
import styles from "../../styles/ToDo.module.scss";
import AddForm from "./AddForm";
import ToDoItemsList from "./TodoItemList";

const SelectTasks: React.FC = () => {
  const { list } = useSelector((state: RootState) => state);
  const { categoriesOption, addedForm, tasks } = list;
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

        <ToDoItemsList />
      </div>
    </div>
  );
};

export default SelectTasks;

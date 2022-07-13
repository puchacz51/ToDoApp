import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompleted,
  setEditedTask,
  setQuantityOfCurrentTasks,
} from "../../Store/listSlice";
import styles from "../../styles/ToDo.module.scss";
import { BsFileText } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import moment from "moment";
import { SwitchIcon } from "./AppIcons";
import { RootState } from "../../Store/Store";
import { VscDebugRestart } from "react-icons/vsc";
import { Task } from "../../types";
const ToDoItemsList: FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const { selectedCategories, selectedDate, selectedStatus } = filter;
  const { tasks } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();
  const [currentList, setCurrentList] = React.useState<Task[]>(tasks);

  useEffect(() => {
    const filteredList = tasks.filter(
      (task) =>
        selectedCategories.includes(task.category) &&
        task.createDate > selectedDate[0] &&
        ((task.completedDate && selectedStatus.includes("completed")) ||
          (!task.completedDate && selectedStatus.includes("active")))
    );
    dispatch(setQuantityOfCurrentTasks(filteredList.length));
    setCurrentList(filteredList);
  }, [filter,tasks]);

  return (
    <>
      {currentList.map((task, i) => {
        const { id, title, createDate, category, completedDate } = task;
        const classList = task.completedDate
          ? `${styles.taskCompleted} ${styles.task}`
          : `${styles.task}`;
        const relativeDateCreate = moment(createDate).fromNow();
        const relativeDateComplete = moment(completedDate).fromNow();
        return (
          <>
            <div className={classList} key={id}>
              <div className={`${styles.categoryIcon}`}>
                <SwitchIcon option={category} />
              </div>
              <p className={styles.title}>{`${i + 1}.   ${title}`}</p>

              <p className={styles.description}>
                {task.description.length > 100
                  ? `${task.description.substring(0, 100)} ...`
                  : task.description}
              </p>

              <span className={styles.time}>
                {completedDate
                  ? `completed ${relativeDateComplete}`
                  : `created ${relativeDateCreate}`}{" "}
              </span>
              <button
                name="editButton"
                className={`${styles.more} ${styles.icon}`}
                onClick={() => dispatch(setEditedTask(task))}
              >
                <BsFileText></BsFileText>
              </button>

              <button
                name="changeStatusButton"
                onClick={() => dispatch(toggleCompleted(id))}
                className={`${styles.completed} ${styles.icon}`}
              >
                {task.completedDate ? <VscDebugRestart /> : <FaCheck />}
              </button>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ToDoItemsList;

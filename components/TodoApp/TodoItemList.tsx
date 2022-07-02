import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompleted, setEditedTask } from "../../Store/listSlice";
import styles from "../../styles/ToDo.module.scss";
import { BsFileText } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import moment from "moment";
import { SwitchIcon } from "./AppIcons";
import { RootState } from "../../Store/Store";
import { VscDebugRestart } from "react-icons/vsc";
import { Task } from "../../types";
const ToDoItemsList: FC = () => {
  const { selectedCategories, selectedDate, selectedStatus } = useSelector(
    (state: RootState) => state.filter
  );
  const { tasks } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();
  const [currentList, setCurrentList] = React.useState<Task[]>(tasks);

  useEffect(() => {
    const filteredList = tasks.filter(
      (task) =>
        selectedCategories.includes(task.category) &&
        task.createDate > selectedDate[0] &&
        ((task.completedDate && selectedStatus.includes("active")) ||
          (!task.completedDate && selectedStatus.includes("completed")))
    );
    setCurrentList(filteredList);
  }, [selectedCategories, selectedDate, selectedStatus, tasks]);

  return (
    <>
      {currentList.map((task, i) => {
        const { id, title, createDate, category } = task;
        const classList = task.completedDate
          ? `${styles.taskCompleted} ${styles.task}`
          : `${styles.task}`;
        const relativeDate = moment(createDate).fromNow();

        return (
          <>
            <div className={classList} key={id}>
              <div className={`${styles.categoryIcon}`}>
                <SwitchIcon option={category} />
              </div>
              <p className={styles.title}>{`${i + 1}.   ${title}`}</p>

              <p className={styles.description}>{`${task.description}`}</p>

              <span className={styles.time}> created {relativeDate}</span>
              <button
                className={`${styles.more} ${styles.icon}`}
                onClick={() => dispatch(setEditedTask(task))}
              >
                <BsFileText></BsFileText>
              </button>

              <button
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

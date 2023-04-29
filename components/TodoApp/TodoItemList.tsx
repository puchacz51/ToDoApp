import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCompleted,
  setEditedTask,
  setQuantityOfCurrentTasks,
} from "../../Store/listSlice";
import { BsFileText } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import moment from "moment";
import { SwitchIcon } from "./AppIcons";
import { RootState } from "../../Store/Store";
import { VscDebugRestart } from "react-icons/vsc";
import { ListItemProps, Task } from "../../types";
import styles from "../../styles/ToDo.module.scss";
import ViewTask from "./ViewTask";

const ToDoItemsList = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const { selectedCategories, selectedDate, selectedStatus } = filter;
  const { tasks, editedTask } = useSelector((state: RootState) => state.list);
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
  }, [filter, tasks, editedTask]);
  if (!currentList.length) {
    return (
      <div className={styles.noTasks}>
        <h3>No tasks</h3>
      </div>
    );
  }

  return (
    <>
      {currentList.map((task, index) => (
        <ListItem
          key={task.id}
          taskProps={task}
          index={index}
          editedTask={editedTask}
        />
      ))}
    </>
  );
};
const ListItem: FC<ListItemProps> = ({ taskProps, index, editedTask }) => {
  const dispatch = useDispatch();

  const { id, title, createDate, category, completedDate, description } =
    taskProps;

  let classList = completedDate
    ? `${styles.taskCompleted} ${styles.task}`
    : `${styles.task}`;
  const isEdited = editedTask?.id === id;
  classList = isEdited ? classList + " " + styles.editedTask : classList;
  const relativeDateCreate = moment(createDate).fromNow();
  const relativeDateComplete = moment(completedDate).fromNow();
  const handleEditedTask = () => {
    if (isEdited) {
      dispatch(setEditedTask(null));
      return;
    }
    dispatch(setEditedTask(taskProps));
  };

  return (
    <>
      <div className={classList} key={id}>
        <div className={`${styles.categoryIcon}`}>
          <SwitchIcon option={category} />
        </div>
        <p className={styles.title}>{`${index + 1}.   ${title}`}</p>

        <p className={styles.description}>
          {description.length > 100
            ? `${description.substring(0, 100)} ...`
            : description}
        </p>

        <span className={styles.time}>
          {completedDate
            ? `completed ${relativeDateComplete}`
            : `created ${relativeDateCreate}`}{" "}
        </span>
        <button
          name="editButton"
          className={`${styles.more} ${styles.icon}`}
          onClick={() => handleEditedTask()}
        >
          <BsFileText></BsFileText>
        </button>

        <button
          name="changeStatusButton"
          disabled={isEdited}
          onClick={() => dispatch(toggleCompleted(id))}
          className={`${styles.completed} ${styles.icon}`}
        >
          {completedDate ? <VscDebugRestart /> : <FaCheck />}
        </button>
        {isEdited && <ViewTask />}
      </div>
    </>
  );
};

export default ToDoItemsList;

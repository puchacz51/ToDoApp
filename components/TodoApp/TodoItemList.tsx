import { useEffect, useState } from "react";
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
import { useAppSelector } from "../../Store/Store";
import { VscDebugRestart } from "react-icons/vsc";
import { Category, ListItemProps, Task } from "../../types";
import styles from "../../styles/ToDo.module.scss";
import ViewTask from "./ViewTask";
import { useToggleIsCompletedMutation } from "../../Store/taskApi";

const ToDoItemsList = ({ taskList = [] }: { taskList: Task[] }) => {
  const filter = useAppSelector((state) => state.filter);
  const { selectedCategories, selectedDate, selectedStatus } = filter;
  const { editedTask } = useAppSelector((state) => state.list);
  const dispatch = useDispatch();
  const [currentList, setCurrentList] = useState<Task[]>(taskList);
  useEffect(() => {
    const filteredList = taskList?.filter(
      (task) =>
        selectedCategories.includes(task.category as Category) &&
        new Date(task.created_at).getTime() > selectedDate[0] &&
        ((task.completed_at && selectedStatus.includes("completed")) ||
          (!task.completed_at && selectedStatus.includes("active")))
    );
    dispatch(setQuantityOfCurrentTasks(filteredList.length));
    setCurrentList(filteredList);
  }, [filter, taskList]);

  if (!currentList?.length) {
    return (
      <div className={styles.noTasks}>
        <h3>No tasks</h3>
      </div>
    );
  }

  return (
    <>
      {currentList?.map((task, index) => (
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

  const {
    id,
    title,
    created_at,
    category,
    completed_at,
    description,
    user_id,
  } = taskProps;
  const [setCompleted, { isLoading }] = useToggleIsCompletedMutation();

  const isEdited = editedTask?.id === id;
  let taskClassList = styles.task;
  if (completed_at != null) taskClassList += " " + styles.taskCompleted;
  if (isEdited) taskClassList += +" " + styles.editedTask;
  if (isLoading) {
    taskClassList += " " + styles.taskLoading;
  }
  const relativeDateCreate = moment(created_at).fromNow();
  const relativeDateComplete = moment(completed_at).fromNow();
  const handleEditedTask = () => {
    if (isEdited) {
      dispatch(setEditedTask(null));
      return;
    }
    dispatch(setEditedTask(taskProps));
  };
  const toggleCompleted = () => {
    setCompleted({ taskId: id, completed: !!completed_at, userId: user_id });
  };

  return (
    <>
      <div className={taskClassList} key={id}>
        <div className={`${styles.categoryIcon} `}>
          <SwitchIcon option={category as Category} />
        </div>
        <p className={styles.title}>{`${index + 1}.   ${title}`}</p>

        <p className={styles.description}>
          {description.length > 100
            ? `${description.substring(0, 100)} ...`
            : description}
        </p>

        <span className={styles.time}>
          {completed_at
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
          onClick={toggleCompleted}
          className={`${styles.completed} ${styles.icon}`}
        >
          {completed_at ? <VscDebugRestart /> : <FaCheck />}
        </button>
        {isEdited && <ViewTask />}
        {/* <div className={styles.taskLoadingLayer}>spinner</div> */}
      </div>
    </>
  );
};

export default ToDoItemsList;

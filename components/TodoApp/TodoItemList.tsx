import React, { useEffect } from "react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompleted, setEditedTask } from "../../Store/listSlice";
import styles from "../../styles/ToDo.module.scss";
import { BsFileText } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { FaSchool, FaSun, FaSuitcase, FaCheck } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { RootState } from "../../Store/Store";
import { VscDebugRestart } from "react-icons/vsc";
// import { Category } from "../types";

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
        task.createDate > selectedDate &&
        ((task.completedDate && selectedStatus != "active") ||
          (!task.completedDate && selectedStatus != "completed"))
    );
    setCurrentList(filteredList);
  }, [selectedCategories, selectedDate, selectedStatus, tasks]);

  return (
    <>
      <h2>quantity of tasks: {tasks.length}</h2>
      {currentList.map((task, i) => {
        const { id, title, createDate, category } = task;
        const classList = task.completedDate
          ? `${styles.taskCompleted} ${styles.task}`
          : `${styles.task}`;
        const date = new Date(createDate);
        const displayDate = date.toLocaleDateString();
        const time = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <>
            <div className={classList} key={id}>
              <div className={`${styles.categoryIcon}`}>
                <SwitchIcon option={category} />
              </div>
              <p className={styles.title}>{`${i + 1}.   ${title}`}</p>

              <p className={styles.description}>{`${task.description}`}</p>

              <span className={styles.date}>added: {displayDate}</span>
              <span className={styles.time}> at {time}</span>
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

// export const ToDoItemListComplted: FC = () => {
//   const { selectedCategories, selectedDate } = useSelector(
//     (state: RootState) => state.filter
//   );
//   const { completedTask } = useSelector((state: RootState) => state.list);
//   const dispatch = useDispatch();

//   return (
//     <>
//       <h2>quantity of completed Tasks : {completedTask.length}</h2>
//       {completedTask
//         .filter(
//           ({ category, createDate }) =>
//             selectedCategories.includes(category) && createDate > selectedDate
//         )
//         .map((task, i) => {
//           const { id, title, createDate, category } = task;
//           const date = new Date(createDate);
//           const displayDate = date.toLocaleDateString();
//           const time = date.toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           });
//           return (
//             <div className={`${styles.task} ${styles.taskCompleted} `} key={id}>
//               <div className={`${styles.categoryIcon}`}>
//                 <SwitchIcon option={category} />
//               </div>
//               <p className={styles.title}>{`${i + 1}.   ${title}`}</p>

//               <p className={styles.description}>{`${task.description}`}</p>

//               <span className={styles.date}>{displayDate}</span>
//               <span className={styles.time}>{time}</span>
//               <button
//                 className={`${styles.more} ${styles.icon}`}
//                 onClick={() => dispatch(setEditedTask(task))}
//               >
//                 <BsFileText></BsFileText>
//               </button>
//               <button
//                 className={`${styles.active} ${styles.icon}`}
//                 onClick={() => dispatch(active(task.id))}
//               >
//                 <VscDebugRestart></VscDebugRestart>
//               </button>
//             </div>
//           );
//         })}
//     </>
//   );
// };

const SwitchIcon: FC<{ option: string }> = (props) => {
  const category: string = props.option;

  let icon: JSX.Element;
  switch (category) {
    case "gym":
      icon = <CgGym />;
      break;
    case "school":
      icon = <FaSchool />;
      break;
    case "work":
      icon = <FaSuitcase />;
      break;
    case "daily duties":
      icon = <FaSun />;
      break;

    default:
      icon = <BiTask />;
      break;
  }
  return icon;
};

export default ToDoItemsList;

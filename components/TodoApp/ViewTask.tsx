import styles from "../../styles/ViewTasks.module.scss";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { setEditedTask } from "../../Store/listSlice";
import { Category, Task } from "../../types";
import {
  useDeleteTaskMutation,
  useModifyTaskMutation,
} from "../../Store/taskApi";

const ViewTask: React.FC = () => {
  const { category, completed_at, description, id, user_id, title } =
    useSelector((state: RootState) => state.list.editedTask as Task);
  const { categoriesOption } = useSelector((state: RootState) => state.list);
  const [edited, setEdited] = useState<Boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>(title);
  const [currentDescription, setCurrentDescription] =
    useState<string>(description);
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const [modifyTask, { isLoading: isModifying }] = useModifyTaskMutation();
  const dispatch = useDispatch();
  const [currentCategory, setCurrentCategory] = useState<Category>(
    category as Category
  );
  const [descriptionFocused, setDescriptionFocused] = useState<boolean>(false);
  const refViewContainer = useRef(null);
  const removeTask = () => {
    deleteTask({ taskId: id, user_id });
    dispatch(setEditedTask(null));
  };
  const defualtValue = () => {
    setCurrentTitle(title);
    setCurrentDescription(description);
    setEdited(false);
  };

  const handleModifyTask = () => {
    modifyTask({
      id,
      title: currentTitle,
      category: currentCategory,
      description: currentDescription,
      completed_at,
      user_id,
    });
    setEdited(false);
  };

  return (
    <div className={styles.viewWrapper}>
      <div ref={refViewContainer} className={styles.view}>
        <div
          className={`${styles.innerView} ${
            descriptionFocused && styles.viewUp
          }`}
        >
          <span className={styles.cancel}>
            <button onClick={() => dispatch(setEditedTask(null))}>X</button>
          </span>
          <label className={styles.title} htmlFor="title">
            Title
          </label>
          <input
            onChange={(e) => setCurrentTitle(e.currentTarget.value)}
            className={styles.title}
            type="text"
            value={currentTitle}
            disabled={!edited}
          />
          <label className={styles.categories} htmlFor="categories">
            categories
          </label>
          <select
            className={styles.categories}
            name="categories"
            disabled={!edited}
            onChange={(e) =>
              setCurrentCategory(e.currentTarget.value as Category)
            }
          >
            {categoriesOption.map((cat) => {
              return (
                <option key={cat} value={cat} selected={cat == currentCategory}>
                  {cat.toLocaleUpperCase()}
                </option>
              );
            })}
          </select>
          <label className={styles.description} htmlFor="description">
            Desciption
          </label>
          <textarea
            className={styles.description}
            onFocus={() => setDescriptionFocused(true)}
            onBlur={() => setDescriptionFocused(false)}
            onChange={(e) => setCurrentDescription(e.currentTarget.value)}
            value={currentDescription}
            disabled={!edited}
          />
          {!edited ? (
            <>
              <button className={styles.edit} onClick={() => setEdited(true)}>
                <AiFillEdit></AiFillEdit>
              </button>
              <button className={styles.remove} onClick={removeTask}>
                <BsFillTrashFill></BsFillTrashFill>
              </button>
            </>
          ) : (
            <>
              <button onClick={handleModifyTask} className={styles.modify}>
                <FaSave></FaSave>
              </button>
              <button onClick={defualtValue} className={styles.reset}>
                RESET
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;

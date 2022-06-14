import styles from "../../styles/Viewtask.module.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { modify, remove, setEditedTask } from "../../Store/listSlice";
import { Category, Task } from "../../types";

const ViewTask: React.FC = () => {
  const editedTask = useSelector(
    (state: RootState) => state.list.editedTask as Task
  );
  const { categoriesOption } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();
  const [edited, setEdited] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>(editedTask.title);
  const [description, setDescription] = useState<string>(
    editedTask.description
  );
  const [category, setCategory] = useState<Category>(editedTask.category);

  const removeTask = () => {
    dispatch(remove([editedTask?.id, editedTask?.completed]));
    dispatch(setEditedTask(null));
  };
  const defualtValue = () => {
    setTitle(editedTask.title);
    setDescription(editedTask.description);
    setEdited(false);
  };

  const modifyTask = () => {
    dispatch(
      modify({
        id: editedTask.id,
        title,
        category,
        description,
        createDate: editedTask.createDate,
        completed: editedTask.completed,
        completedDate: editedTask.completedDate ? Date.now() : null,
      })
    );

    setEdited(false);
  };

  return (
    <div className={styles.view}>
      <button
        className={styles.cancel}
        onClick={() => dispatch(setEditedTask(null))}
      >
        X
      </button>

      <div className={styles.innerView}>
        <label className={styles.title} htmlFor="title">
          Title
        </label>

        <input
          onChange={(e) => setTitle(e.currentTarget.value)}
          className={styles.title}
          type="text"
          value={title}
          disabled={!edited}
        />
        <label className={styles.categories} htmlFor="categories">
          categories
        </label>

        <select
          className={styles.categories}
          name="categories"
          disabled={!edited}
          onChange={(e) => setCategory(e.currentTarget.value as Category)}
        >
          {categoriesOption.map((cat) => {
            return (
              <option key={cat} value={cat} selected={cat == category}>
                {cat.toLocaleUpperCase()}
              </option>
            );
          })}
        </select>
        <label className={styles.description} htmlFor="description">
          Descipttion
        </label>
        <textarea
          className={styles.description}
          disabled={!edited}
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
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
            <button onClick={modifyTask} className={styles.modify}>
              <FaSave></FaSave>
            </button>
            <button onClick={defualtValue} className={styles.reset}>
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewTask;

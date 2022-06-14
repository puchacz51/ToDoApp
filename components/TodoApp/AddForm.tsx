import { useState } from "react";
import React from "react";
import styles from "../../styles/ViewTasks.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { toggleAddedForm, add } from "../../Store/listSlice";
import { Category } from "../../types";
const AddForm: React.FC = () => {
  const { categoriesOption } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryOption, setCategoryOption] = useState<Category | null>(null);
  const addTask = () => {
    if (title.length > 0 && description.length > 0 && categoryOption != null) {
      dispatch(
        add({
          title,
          description,
          category: categoryOption,
          createDate: Date.now(),
          completed: false,
          completedDate: null,
        })
      );
      dispatch(toggleAddedForm());
    }
  };
  return (
    <div className={styles.view}>
      <button
        className={styles.cancel}
        onClick={() => dispatch(toggleAddedForm())}
      >
        X
      </button>

      <div className={styles.innerView}>
        <label className={styles.title} htmlFor="title">
          Title
        </label>

        <input
          className={styles.title}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <label className={styles.categories} htmlFor="categories">
          categories
        </label>

        <select
          className={styles.categories}
          onChange={(e) => setCategoryOption(e.currentTarget.value as Category)}
          name="categories"
        >
          <option value="" selected>
            SELECT
          </option>
          {categoriesOption.map((category) => {
            return (
              <option key={category} value={category}>
                {category.toLocaleUpperCase()}
              </option>
            );
          })}
        </select>

        <label className={styles.description} htmlFor="description">
          Descipttion
        </label>

        <textarea
          className={styles.description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        />

        <button
          disabled={!(title && description && categoryOption)}
          className={`${styles.add} ${styles.icon}`}
          onClick={addTask}
        >
          <IoMdAddCircle></IoMdAddCircle>
        </button>
      </div>
    </div>
  );
};

export default AddForm;

import { useRef, useState } from "react";
import React from "react";
import styles from "../../styles/ViewTasks.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/Store";
import { toggleAddedForm, add } from "../../Store/listSlice";
import { Category } from "../../types";
import { SwitchIcon } from "./AppIcons";
const AddForm: React.FC = () => {
  const { categoriesOption } = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryOption, setCategoryOption] = useState<Category | null>(null);
  const [descriptionFocused, setDescriptionFocused] = useState<boolean>(false);

  const refViewContainer = useRef(null);

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
    <div ref={refViewContainer} className={styles.view}>
      <div
        className={`${styles.innerView} ${descriptionFocused && styles.viewUp}`}
      >
        <span className={styles.cancel}>
          <button onClick={() => dispatch(toggleAddedForm())}>X</button>
        </span>
        <label className={styles.title} htmlFor="title">
          Title
        </label>

        <input
          className={styles.title}
          placeholder="TITLE"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <label className={styles.categories} htmlFor="categories">
          category
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
                <p>{category.toLocaleUpperCase()}</p>
                <SwitchIcon option={category as Category}></SwitchIcon>
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

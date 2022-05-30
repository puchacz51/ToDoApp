import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {FaRegCheckSquare} from "react-icons/fa"
import styles from "../../styles/FilterTasks.module.css";
import { Category, TaskStatus } from "../../types";
import {
  toggleCategories,
  toggleStatus,
  selectDate,
} from "../../Store/filterSlice";
import { RootState } from "../../Store/Store";
// import { FilterOptions ,categoriesOptions} from "../../types";
const FilterTasks: FC<{ categoriesOption: Category[] }> = ({
  categoriesOption,
}) => {
  const { selectedCategories} = useSelector(
    (state: RootState) => state.filter
  );
  const [dateNow] = useState(new Date(Date.now()));
  const [[dayNow, monthNow, yearNow]] = useState(
    dateNow
      .toLocaleDateString()
      .split(".")
      .map((v) => Number(v))
  );

  const dispatch = useDispatch();

  const categorySelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.currentTarget.value as Category;
    dispatch(toggleCategories(currentValue));

  };
  const dateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = Number(e.currentTarget.value);
    dispatch(selectDate(currentValue));
  };
  return (
    <div className={styles.filter}>
      <div className={styles.selectOptions}>
        <select name="category" onChange={(e) => categorySelectHandler(e)}>
          <option value="">all categories</option>
          {categoriesOption.map((cat) => {
            return selectedCategories.includes(cat) ? (
              <option className={styles.checked} value={cat} key={cat}>
                {cat}
              </option>
            ) : (
              <option value={cat}> {cat}</option>
            );
          })}
        </select>
        <select name="date" onChange={(e) => dateSelectHandler(e)}>
          <option value={0}>Whenever</option>
          <option value={new Date().setFullYear(yearNow, monthNow-1, dayNow - 1)}>
            last day
          </option>
          <option
            value={
              new Date().setFullYear(yearNow, monthNow-1, dayNow) -
              ((dateNow.getDay() + 7) % 8) * 1000 * 60 * 60 * 24
            }
          >
            last week
          </option>
          <option value={new Date().setFullYear(yearNow, monthNow - 1, 0)}>
            last month
          </option>
          <option value={new Date().setFullYear(yearNow, 0, 0)}>
            last year
          </option>
        </select>
        <select
          name="date"
          onChange={(e) =>
            dispatch(toggleStatus(e.currentTarget.value as TaskStatus))
          }
        >
          <option value="both">both</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <div className={styles.selectedOptions}></div>
    </div>
  );
};

export default FilterTasks;

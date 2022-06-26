import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {FaRegCheckSquare} from "react-icons/fa"
import styles from "../../styles/FilterTasks.module.scss";
import { SwitchIcon } from "./AppIcons";
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
  const { selectedCategories } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();

  const categorySelectHandler = (selectedCategory: Category) => {
    dispatch(toggleCategories(selectedCategory));
  };
  const dateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectDate(Number(e.target.value)));
  };
  return (
    <div className={styles.filterContainter}>
      <h4>categories</h4>
      <div className={styles.categoryFilter}>
        {categoriesOption.map((category) => (
          <button
            className={
              selectedCategories.includes(category)
                ? `${styles.categoryButton} ${styles.selected}`
                : styles.categoryButton
            }
            onClick={() => categorySelectHandler(category)}
            key={category}
          >
            <SwitchIcon option={category} />
            <span>{category}</span>
          </button>
        ))}
      </div>
      <h4>Date</h4>
      <div className={styles.dateFilter}>
        <div className={styles.dateSelect}>
          <select
            name="date"
            className={styles.dateSelect}
            onChange={dateSelectHandler}
          >
            <option value="0">All</option>
            <option value="1">Today</option>
            <option value="2">This week</option>
            <option value="3">This month</option>
            <option value="4">This year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterTasks;

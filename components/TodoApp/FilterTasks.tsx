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
  toggleFilterVisibility,
} from "../../Store/filterSlice";
import { RootState } from "../../Store/Store";
// import { FilterOptions ,categoriesOptions} from "../../types";
const FilterTasks: FC<{ categoriesOption: Category[] }> = ({
  categoriesOption,
}) => {
  const { selectedCategories, filterVisibility } = useSelector(
    (state: RootState) => state.filter
  );

  const dispatch = useDispatch();

  const categorySelectHandler = (selectedCategory: Category) => {
    dispatch(toggleCategories(selectedCategory));
  };
  const dateSelectHandler = (days: Number) => {
    dispatch(selectDate(Number(days)));
  };
  const dataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    dispatch(selectDate(new Date(e.target.value).getTime()));
  };
  const statusSelectHandler = (status: TaskStatus) => {
    dispatch(toggleStatus(status));
  };

  const filterVisibilityHandler = () => {
    dispatch(toggleFilterVisibility());
  };
  return (
    <>
      <div
        className={`${styles.filterContainter} ${
          filterVisibility || styles.filterVisible
        }`}
      >
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
          <button
            className={styles.dateButton}
            onClick={() => dateSelectHandler(0)}
          >
            last day
          </button>
          <button
            className={styles.dateButton}
            onClick={() => dateSelectHandler(1)}
          >
            last week
          </button>
          <button
            className={styles.dateButton}
            onClick={() => dateSelectHandler(2)}
          >
            last month
          </button>
          <button
            className={styles.dateButton}
            onClick={() => dateSelectHandler(3)}
          >
            last year
          </button>
          <input type="date" onChange={dataInputHandler} />
        </div>
        <div className={styles.statusFilter}>
          <h4>Status</h4>
          <button
            className={styles.statusButton}
            onClick={() => statusSelectHandler("active")}
          >
            active
          </button>
          <button
            className={styles.statusButton}
            onClick={() => statusSelectHandler("completed")}
          >
            completed
          </button>
        </div>
      </div>
      <button onClick={filterVisibilityHandler}>
        {filterVisibility ? "Filer Task" : "Close Filer"}
      </button>
    </>
  );
};

export default FilterTasks;

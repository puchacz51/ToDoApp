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
  const dateSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectDate(Number(e.target.value)));
  };
  const statusSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);

    dispatch(toggleStatus(e.target.value as TaskStatus));
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
          <div className={styles.dateSelect}>
            <span>today</span>
            <input name="date" type="radio" value="1" />
            <span>yesterday</span>
            <input name="date" type="radio" value={2} />
            <span>last week</span>
            <input name="date" type="radio" value={3} />
            <span>last month</span>
            <input name="date" type="radio" value={4} />
          </div>
        </div>
      </div>
      <button onClick={filterVisibilityHandler}>
        {filterVisibility ? "Filer Task" : "Close Filer"}
      </button>
    </>
  );
};

export default FilterTasks;

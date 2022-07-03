import React, { FC, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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

const FilterTasks: FC<{ categoriesOption: Category[] }> = ({
  categoriesOption,
}) => {
  const { selectedCategories, filterVisibility, selectedDate, selectedStatus } =
    useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const categorySelectHandler = (selectedCategory: Category) => {
    dispatch(toggleCategories(selectedCategory));
  };

  const statusSelectHandler = (status: TaskStatus) => {
    dispatch(toggleStatus(status));
  };

  const filterVisibilityHandler = () => {
    dispatch(toggleFilterVisibility());
  };
  return (
    <div className={styles.filterWrapper}>
      <div
        className={`${styles.filterContainter} ${
          filterVisibility || styles.filterVisible
        }`}
      >
        <h4 className={styles.categoryFilterTitle}>categories</h4>
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
        <DateFilter selectedDate={selectedDate} />
        <h4 className={styles.statusFilterTitle}>Status</h4>

        <div className={styles.statusFilter}>
          <button
            className={`${styles.statusActiveBtn} ${
              selectedStatus.includes("active") && styles.selected
            }`}
            onClick={() => statusSelectHandler("active")}
          >
            active
          </button>
          <button
            className={`${styles.statusComplitedBtn} ${
              selectedStatus.includes("completed") && styles.selected
            }`}
            onClick={() => statusSelectHandler("completed")}
          >
            completed
          </button>
        </div>
      </div>
      <button
        className={styles.filterVisibilityBtn}
        onClick={filterVisibilityHandler}
      >
        {filterVisibility ? "Filer Task" : "Close Filer"}
      </button>
    </div>
  );
};

export default FilterTasks;

const DateFilter: FC<[number, number]> = ({ selectedDate }) => {
  const dispatch = useDispatch();
  const calendarRef = useRef<HTMLDataElement>(null);
  const dateSelectHandler = (selectedOption: [number, number]) => {
    dispatch(selectDate([Number(selectedOption), 0]));
  };
  const dataInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectDate([4, new Date(e.target.value).getTime()]));
  };
  return (
    <>
      <h4 className={styles.dateFilterTitle}>Date</h4>
      <div className={styles.dateFilter}>
        <button
          className={`${styles.dateBtn} ${
            selectedDate[1] === 1 && styles.selected
          }`}
          onClick={() => dateSelectHandler(1)}
        >
          last day
        </button>
        <button
          className={`${styles.dateBtn} ${
            selectedDate[1] === 2 && styles.selected
          }`}
          onClick={() => dateSelectHandler(2)}
        >
          last week
        </button>
        <button
          className={`${styles.dateBtn} ${
            selectedDate[1] === 3 && styles.selected
          }`}
          onClick={() => dateSelectHandler(3)}
        >
          last month
        </button>

        <button
          className={`${styles.dateBtn}  ${
            selectedDate[1] === 4 && styles.selected
          }`}
          onClick={() => {
            selectedDate[1] === 4
              ? dispatch(selectDate([4, 0]))
              : calendarRef.current?.showPicker();
          }}
        >
          {selectedDate[1] === 4
            ? new Date(selectedDate[0]).toISOString().slice(0, 10)
            : "select date"}
        </button>
        <input ref={calendarRef} type="date" onChange={dataInputHandler} />
      </div>
    </>
  );
};

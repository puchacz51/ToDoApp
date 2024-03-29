import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwitchIcon } from "./AppIcons";
import { Category, FilterDateOption, TaskStatus } from "../../types";
import {
  toggleCategories,
  toggleStatus,
  selectDate,
  toggleFilterVisibility,
} from "../../Store/filterSlice";
import { RootState } from "../../Store/Store";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../../styles/FilterTasks.module.scss";

const FilterTasks: FC<{ categoriesOption: Category[] }> = ({
  categoriesOption,
}) => {
  const { selectedCategories, filterVisibility, selectedDate, selectedStatus } =
    useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();
  const { quantityOfCurrentTasks } = useSelector(
    (state: RootState) => state.list
  );
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
          filterVisibility && styles.filterVisible
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
        {filterVisibility
          ? `Filtr Tasks(${quantityOfCurrentTasks})`
          : `Close Filter(${quantityOfCurrentTasks})`}
      </button>
    </div>
  );
};

export default FilterTasks;

const DateFilter: FC<{ selectedDate: FilterDateOption }> = ({
  selectedDate,
}) => {
  const dispatch = useDispatch();
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const selectDateBtnRef = useRef<HTMLButtonElement>(null);
  const calendarRef = useRef<HTMLInputElement>(null);
  const dateSelectHandler = (selectedOption: FilterDateOption | number) => {
    dispatch(selectDate([Number(selectedOption), 0]));
  };
  const calendarDataHandler = (calendarDate: Date) => {
    dispatch(selectDate([4, calendarDate.getTime() + 13]));
    setCalendarVisibility(false);
  };
  const calendarBtnHandler = () => {
    console.log("calendarBtnHandler");

    if (selectedDate[1] === 4) {
      setCalendarVisibility(false);
      dispatch(selectDate([0, 0]));
    }
   else if (selectedDate[1] === 0 && calendarVisibility) {
      setCalendarVisibility(false);
    } else {
      setCalendarVisibility(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node) &&
        !selectDateBtnRef.current?.contains(e.target as Node)
      ) {
        setCalendarVisibility(false);
      }
    };
    if (calendarVisibility) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarVisibility]);

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
          ref={selectDateBtnRef}
          className={`${styles.dateBtn}  ${
            selectedDate[1] === 4 && styles.selected
          }`}
          onClick={() => {
            calendarBtnHandler();
          }}
        >
          {selectedDate[1] === 4
            ? new Date(selectedDate[0]).toISOString().slice(0, 10)
            : "select date"}
        </button>
        {calendarVisibility && (
          <Calendar
            inputRef={calendarRef}
            className={styles.calendar}
            onClickDay={(e: Date) => calendarDataHandler(e)}
          ></Calendar>
        )}
      </div>
    </>
  );
};

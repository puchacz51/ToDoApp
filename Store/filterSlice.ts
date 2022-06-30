import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus, TaskFilter, Category } from "../types";

const categories = [
  "gym",
  "work",
  "daily duties",
  "others",
  "school",
] as Category[];
const initialState: TaskFilter = {
  selectedCategories: categories,
  selectedStatus: "both",
  selectedDate: 0,
  filterVisibility: false,
};
const filterSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    toggleCategories: (state, action: PayloadAction<Category>) => {
      state.selectedCategories.includes(action.payload)
        ? (state.selectedCategories = state.selectedCategories.filter(
            (cat: Category) => cat != action.payload
          ))
        : (state.selectedCategories = [
            ...state.selectedCategories,
            action.payload,
          ]);
    },
    toggleStatus: (state, action: PayloadAction<TaskStatus>) => {
      state.selectedStatus = action.payload;
    },
    selectDate: (state, action: PayloadAction<number>) => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const dayInWeek = currentDate.getDay() + 1;

      switch (action.payload) {
        case 0:
          state.selectedDate = new Date(
            currentYear,
            currentMonth,
            currentDay - 1
          ).getTime();
          break;
        case 1:
          state.selectedDate =
            new Date(currentYear, currentMonth, currentDay).getTime() -
            dayInWeek * 24 * 60 * 60 * 1000;
          break;
        case 2:
          state.selectedDate = new Date(currentYear, currentMonth, 0).getTime();
          break;
        case 3:
          state.selectedDate = new Date(currentYear - 1, 0, 0).getTime();
          break;
        default:
          state.selectedDate = action.payload;
          break;
      }
    },
    toggleFilterVisibility: (state) => {
      state.filterVisibility = !state.filterVisibility;
    },
  },
});
export default filterSlice.reducer;
export const {
  toggleCategories,
  toggleStatus,
  selectDate,
  toggleFilterVisibility,
} = filterSlice.actions;

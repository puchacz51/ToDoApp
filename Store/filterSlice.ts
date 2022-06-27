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
      const currentDay = currentDate.getDay();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      switch (action.payload) {
        case 0:
          state.selectedDate = new Date(
            currentYear,
            currentMonth,
            currentDay
          ).getTime();
          break;
        case 1:
          state.selectedDate = new Date(
            currentYear,
            currentMonth,
            currentDay - 1
          ).getTime();
          break;
        case 2:
          state.selectedDate = new Date(
            currentYear,
            currentMonth,
            currentDay - 7
          ).getTime();
          break;
        case 3:
          state.selectedDate = new Date(
            currentYear,
            currentMonth,
            currentDay - 30
          ).getTime();
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

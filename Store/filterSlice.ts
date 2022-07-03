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
  selectedStatus: ["active", "completed"],
  selectedDate: [0, 0],
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
      state.selectedStatus.includes(action.payload)
        ? (state.selectedStatus = state.selectedStatus.filter(
            (status) => status != action.payload
          ))
        : (state.selectedStatus = [...state.selectedStatus, action.payload]);
    },
    selectDate: (state, action: PayloadAction<[number, number]>) => {
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const dayInWeek = currentDate.getDay() + 1;
      if (action.payload[0] === state.selectedDate[1]) {
        state.selectedDate = [0, 0];
        return;
      }
      switch (action.payload[0]) {
        case 1:
          state.selectedDate = [
            new Date(currentYear, currentMonth, currentDay - 1).getTime(),
            1,
          ];
          break;
        case 2:
          state.selectedDate = [
            new Date(currentYear, currentMonth, currentDay).getTime() -
              dayInWeek * 24 * 60 * 60 * 1000,
            2,
          ];
          break;
        case 3:
          state.selectedDate = [
            new Date(currentYear, currentMonth, 0).getTime(),
            3,
          ];
          break;

        default:
          state.selectedDate = [action.payload[1], 4];
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

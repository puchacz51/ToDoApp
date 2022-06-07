import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskStatus, TaskFilter, Category } from "../types";

const initialState: TaskFilter = {
  selectedCategories: ["gym", "work", "daily duties", "others", "school"],
  selectedStatus: "both",
  selectedDate: 0,
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
      state.selectedDate = action.payload;
    },
  },
});
export default filterSlice.reducer;
export const { toggleCategories, toggleStatus, selectDate } =
  filterSlice.actions;

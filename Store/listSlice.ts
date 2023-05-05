import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Task, ListSlice } from "../types";
const Datenow = Number(new Date());
const initialState: ListSlice = {
  quantityOfCurrentTasks: 4,
  editedTask: null,
  addedForm: false,
  categoriesOption: ["gym", "school", "work", "daily duties", "others"],
  tasks: [],
};

const ListSlice = createSlice({
  name: "List",
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.tasks.unshift(action.payload);
      },
      prepare: (task: Omit<Task, "id">) => {
        return { payload: { id: nanoid(), ...task } };
      },
    },

    setEditedTask: (state, action: PayloadAction<Task | null>) => {
      if (action.payload == null) {
        state.editedTask = null;
        return;
      }
      state.editedTask = action.payload;
    },
    toggleAddedForm: (state) => {
      state.addedForm = !state.addedForm;
    },

    setQuantityOfCurrentTasks: (state, action: PayloadAction<number>) => {
      state.quantityOfCurrentTasks = action.payload;
    },
  },
});

export default ListSlice.reducer;
export const {
  add,
  setEditedTask,
  toggleAddedForm,
  setQuantityOfCurrentTasks,
} = ListSlice.actions;

import {
  createSlice,
  PayloadAction,
  nanoid,
  PrepareAction,
} from "@reduxjs/toolkit";
import { sortTasks } from "../utilities/TaskList";
import { Task, ListSlice, CompletedTask } from "../types";
import { number } from "yup";
import { FaTasks } from "react-icons/fa";
const Datenow = Number(new Date());
const initialState: ListSlice = {
  quantityOfCurrentTask: 2,
  quantityOfCompletedTask: 1,
  editedTask: null,
  addedForm: false,
  categoriesOption: ["gym", "school", "work", "daily duties", "others"],
  tasks: [
    {
      id: nanoid(),
      title: "Shopping List",
      description: "1.carrots,2.milk,3.butter",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 0.8,
      completed: false,
      category: "daily duties",
      completedDate: null,
    },
    {
      id: nanoid(),
      title: "some Task",
      description: "some description",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 6,
      completed: false,
      category: "school",
      completedDate: null,
    },
    {
      id: nanoid(),
      title: "another task",
      description: "another description",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 29,
      completed: false,
      category: "work",
      completedDate: null,
    },
    {
      id: nanoid(),
      title: "another task2",
      description: "another description2",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 29,
      completed: false,
      category: "work",
      completedDate: Date.now() - 100000,
    },
  ],
};

const ListSlice = createSlice({
  name: "List",
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.quantityOfCurrentTask++;
        state.tasks.unshift(action.payload);
      },
      prepare: (task: Omit<Task, "id">) => {
        return { payload: { id: nanoid(), ...task } };
      },
    },
    remove: (state, action: PayloadAction<[string, boolean]>) => {
      const [removedID, removedStatus] = action.payload;
      if (removedStatus) {
        state.quantityOfCompletedTask--;
      } else {
        state.quantityOfCurrentTask--;
      }
      state.tasks = state.tasks.filter(({ id }) => id != removedID);
    },
    modify: (state, action: PayloadAction<Task>) => {
      const { id } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      state.tasks[index] = action.payload;
      sortTasks(state.tasks);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      state.tasks[index].completedDate
        ? (state.tasks[index].completedDate = null)
        : (state.tasks[index].completedDate = Date.now());
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
  },
});

export default ListSlice.reducer;
export const {
  add,
  remove,
  modify,
  toggleCompleted,
  setEditedTask,
  toggleAddedForm,
} = ListSlice.actions;

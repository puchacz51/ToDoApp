import { createSlice, PayloadAction, nanoid, PrepareAction } from "@reduxjs/toolkit";
import { sortTasks } from "../utilities/TaskList";
import { Task, ListSlice, CompletedTask } from "../types";
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
    },
    {
      id: nanoid(),
      title: "some Task",
      description: "some description",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 6,
      completed: false,
      category: "school",
    },
    {
      id: nanoid(),
      title: "another task",
      description: "another description",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 29,
      completed: false,
      category: "work",
    },
  ],
  completedTask: [
    {
      id: nanoid(),
      title: "ToDoApp",
      description: "Create ToDoApp ",
      createDate: Datenow - 1000 * 60 * 60 * 24 * 34,
      completedDate: 1390000000000,
      category: "work",

      completed: true,
    },
  ],
};

const ListSlice = createSlice({
  name: "List",
  initialState,
  reducers: {
    add: {
      reducer:(state, action: PayloadAction<Task>) => {
      state.quantityOfCurrentTask++;
      state.tasks.unshift(action.payload);
    },
    prepare:(task:Omit<Task,"id">)=>
    {
      return {payload:{id:nanoid(),...task}}

    }
  },
    remove: (state, action: PayloadAction<[string, boolean]>) => {
      const [removedID, removedStatus] = action.payload;
      if (!removedStatus) {
        state.quantityOfCurrentTask--;
        state.tasks = state.tasks.filter(({ id }) => id != removedID);
      } else {
        state.quantityOfCompletedTask--;
        state.completedTask = state.completedTask.filter(
          ({ id }) => id != removedID
        );
      }
    },
    modify: (state, action: PayloadAction<Task | CompletedTask>) => {
      const { id, completed } = action.payload;

      if (!completed) {
        const index = state.tasks.findIndex((task) => task.id === id);
        state.tasks[index] = action.payload;
        sortTasks(state.tasks);
      } else {
        const index = state.tasks.findIndex((task) => task.id === id);
        state.completedTask[index] = action.payload;
        sortTasks(state.completedTask);
      }
    },
    complete: (state, action: PayloadAction<string>) => {
      state.quantityOfCurrentTask--;
      state.quantityOfCompletedTask++;

      const compledtask = state.tasks.find(
        ({ id }) => id == action.payload
      ) as Task;

      compledtask.completedDate = Date.now();
      compledtask.completed = true;
      state.tasks = state.tasks.filter(({ id }) => id !== action.payload);
      state.completedTask.push(compledtask);
    },
    active: (state, action: PayloadAction<string>) => {
      state.quantityOfCurrentTask++;
      state.quantityOfCompletedTask--;

      const activedTask = state.completedTask.find(
        ({ id }) => id == action.payload
      ) as Task;
      delete activedTask.completedDate;
      state.completedTask = state.completedTask.filter(
        ({ id }) => id !== action.payload
      );
      activedTask.completed = false;
      state.tasks.push(activedTask);
    },
    setEditedTask: (state, action: PayloadAction<Task | null>) => {
      if (action.payload==null) {
        state.editedTask = null;
        return;
      }
      if (action.payload.completed) {
        const id = state.completedTask.findIndex((({id})=>id==action.payload.id ));
        state.editedTask = state.completedTask[id];
      } else {
        const id = state.tasks.findIndex(({ id }) => id == action.payload.id);
        state.editedTask = state.tasks[id];
      }
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
  complete,
  active,
  setEditedTask,
  toggleAddedForm,
} = ListSlice.actions;

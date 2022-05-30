interface ToDoItemListProps {
  tasksList: Task[];
  setCompltedTask: Function;
  setEditedTask: Function;
}
interface ToDoItemListCompltedProps {
  completedTaskList: CompletedTask[];
  setEditedTask: Function;
  setActivedTask: Function;
}
type Category = "gym" | "school" | "daily duties" | "work" | "others";
type Task = {
  id: string;
  title: string;
  description: string;
  createDate: number;
  completed: boolean;
  lastModifiedDate?: number;
  completedDate?: number;
  category: Category;
};
type CompletedTask = {
  id: string;
  title: string;
  description: string;
  createDate: number;
  completed: boolean;
  lastModifiedDate?: number;
  category: Category;
  completedDate?: number;
};
interface ListSlice {
  categoriesOption: string[];
  addedForm: boolean;
  quantityOfCurrentTask: number;
  quantityOfCompletedTask: number;
  editedTask: Task | null;
  tasks: Task[];
  completedTask: CompletedTask[];
}
interface FilterOptions {
  complted: Boolean;
  category: String;
  date: [number, number];
}

interface ViewTaskProps {
  task: Task;
  cancel: Function;
  remove: Function;
  modify: Function;
  prevId: number;
}
interface AddFormProps {
  add: Function;
  cancel: Function;
  categoriesOption: Category[];
  prevId: number;
}


type TaskStatus = "both" | "active" | "completed";

interface TaskFilter {
  selectedCategories: Category[] ;
  selectedStatus: TaskStatus;
  selectedDate: Number;
}

export type {
  ToDoItemListProps,
  Task,
  CompletedTask,
  ListSlice,
  FilterOptions,
  ViewTaskProps,
  AddFormProps,
  ToDoItemListCompltedProps,
  Category,
  TaskFilter,
  TaskStatus,
};

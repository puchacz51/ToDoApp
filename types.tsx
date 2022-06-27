interface ToDoItemListProps {
  tasksList: Task[];
  setCompltedTask: Function;
  setEditedTask: Function;
}

type Category = "gym" | "school" | "daily duties" | "work" | "others";
type Task = {
  id: string;
  title: string;
  description: string;
  createDate: number;
  completed: boolean;
  lastModifiedDate?: number;
  completedDate: number | null;
  category: Category;
};

interface ListSlice {
  categoriesOption: string[];
  addedForm: boolean;
  quantityOfCurrentTask: number;
  quantityOfCompletedTask: number;
  editedTask: Task | null;
  tasks: Task[];
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
  selectedCategories: Category[];
  selectedStatus: TaskStatus;
  selectedDate: Number;
  filterVisibility: boolean;
}

export type {
  ToDoItemListProps,
  Task,
  ListSlice,
  FilterOptions,
  ViewTaskProps,
  AddFormProps,
  Category,
  TaskFilter,
  TaskStatus,
};

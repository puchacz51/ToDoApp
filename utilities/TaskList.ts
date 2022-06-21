import { Task } from "../types";
export const sortTasks = (tasks: Task[]) => {
  tasks.sort((taskA, taskB) => {
    if (taskA.completedDate && !taskB.completedDate) return 1;
    if (!taskA.completedDate && taskB.completedDate) return -1;
    if (taskA.completedDate && taskB.completedDate)
      return taskB.completedDate - taskA.completedDate;
    return taskB.createDate - taskA.createDate;
  });
};

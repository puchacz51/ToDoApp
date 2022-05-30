import { Task } from "../types";
export const sortTasks = (tasks: Task[]) => {
  tasks.sort((taskA, taskB) => {
    if(taskA.completed>taskB.completed) return 1
    else if(taskA.completed<taskB.completed) return -1
    else return taskA.createDate-taskB.createDate 
  });
};

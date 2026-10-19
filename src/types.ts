export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type NewTask = Pick<Task, "title">;

export type EditTask = Pick<Task, "id" | "title">;
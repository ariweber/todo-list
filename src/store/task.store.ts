import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewTask, Task, EditTask } from "../types";

type TaskState = {
    tasks: Task[];
    addTask: (newTask: NewTask) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    editTask: (id: string, newData: EditTask) => void;
    deleteAllTasks: () => void;
    moveTask: (fromId: string, toId: string) => void;
};

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (newTask) => {
                const task: Task = {
                    id: crypto.randomUUID(),
                    completed: false,
                    createdAt: Date.now(),
                    ...newTask,
                };
                set((state) => ({ tasks: [task, ...state.tasks] }));
            },
            toggleTask: (id) => set((state) => ({
                tasks: state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
            })),
            deleteTask: (id) => set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            })),
            editTask: (id, newData) => set((state) => ({
                tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...newData } : task)),
            })),
            deleteAllTasks: () => set({ tasks: [] }),
            moveTask: (fromId, toId) => set((state) => {
                const tasks = [...state.tasks];
                const fromIndex = tasks.findIndex((task) => task.id === fromId);
                const toIndex = tasks.findIndex((task) => task.id === toId);
                if (fromIndex === -1 || toIndex === -1) return state;
                if (tasks[fromIndex].completed || tasks[toIndex].completed) return state;
                const [moved] = tasks.splice(fromIndex, 1);
                tasks.splice(toIndex, 0, moved);
                return { tasks };
            }),
        }),
        { name: "tasks" },
    ),
);
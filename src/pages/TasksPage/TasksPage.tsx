// src/pages/TasksPage/TasksPage.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import TaskInput from "../../components/TaskInput/TaskInput";
import TaskList from "../../components/TaskList/TaskList";
import { useTaskStore } from "../../store/task.store";
import "./TasksPage.css";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const editTask = useTaskStore((state) => state.editTask)
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const moveTask = useTaskStore((state) => state.moveTask);


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask({ title: trimmed });
    setTitle("");
  }

  return (
    <section>
      <TaskInput value={title} onChange={setTitle} onSubmit={handleSubmit} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} onMove={moveTask} />
      {tasks.length > 0 && (
        <button className="delete-all-btn" onClick={deleteAllTasks}>
          מחק את כל המשימות
        </button>
      )}
    </section>
  );
}
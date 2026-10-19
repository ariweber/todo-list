import { useState } from "react";
import type { EditTask, Task } from "../../types";
import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.css";

type TaskListProps = {
    tasks: Task[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newData: EditTask) => void;
    onMove: (fromId: string, toId: string) => void;
};

export default function TaskList(
    { tasks, onToggle, onDelete, onEdit, onMove }: TaskListProps,
) {
    const [draggedId, setDraggedId] = useState<string | null>(null);

    function handleDrop(targetId: string) {
        if (!draggedId) return;
        if (draggedId !== targetId) onMove(draggedId, targetId);
        setDraggedId(null);
    }

    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <strong>אין משימות עדיין</strong>
                הוסף את המשימה הראשונה שלך למעלה
            </div>
        );
    }

    const sortedTasks = [...tasks].sort((a, b) =>
        Number(a.completed) - Number(b.completed)
    );

    return (
        <ul className="task-list">
            {sortedTasks.map((task) => (
                <li
                    key={task.id}
                    draggable={!task.completed}
                    className={draggedId === task.id ? "dragging" : ""}
                    onDragStart={() => setDraggedId(task.id)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleDrop(task.id)}
                    onDragEnd={() => setDraggedId(null)}
                >
                    <TaskCard
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                </li>
            ))}
        </ul>
    );
}
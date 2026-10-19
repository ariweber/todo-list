// src/components/TaskCard/TaskCard.tsx
import { useState } from "react";
import type { FormEvent } from "react";
import type { EditTask, Task } from "../../types";
import TaskEdit from "../TaskEdit/TaskEdit";
import "./TaskCard.css";

type TaskCardProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newData: EditTask) => void;
};

export default function TaskCard(
    { task, onToggle, onDelete, onEdit }: TaskCardProps,
) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(task.title);

    function handleStartEdit() {
        setText(task.title);
        setIsEditing(true);
    }
function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onEdit(task.id, { id: task.id, title: trimmed });
    setIsEditing(false);
}

    function handleCancel() {
        setText(task.title);
        setIsEditing(false);
    }

    return (
        <div className={task.completed ? "task-card is-completed" : "task-card"}>
            <div className="task-main">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                {isEditing
                    ? (
                        <TaskEdit
                            value={text}
                            onChange={setText}
                            onSave={handleSave}
                            onCancel={handleCancel}
                        />
                    )
                    : (
                        <span
                            className={task.completed
                                ? "task-title completed"
                                : "task-title"}
                        >
                            {task.title}
                        </span>
                    )}
            </div>
            <div className="task-actions">
                {!isEditing && (
                    <button
                        className="edit-btn"
                        type="button"
                        onClick={handleStartEdit}
                    >
                        ערוך
                    </button>
                )}
                <button
                    className="delete-btn"
                    type="button"
                    onClick={() => onDelete(task.id)}
                >
                    מחק
                </button>
            </div>
        </div>
    );
}
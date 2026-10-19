import type { FormEvent } from "react";
import "./TaskInput.css"


type TaskInputProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function TaskInput({ value, onChange, onSubmit }: TaskInputProps) {
    return (
        <form className="task-form" onSubmit={onSubmit}>
            <input
                className="task-input"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="הוסף משימה"
            />
            <button className="task-submit" type="submit">הוסף</button>
        </form>
    );
}
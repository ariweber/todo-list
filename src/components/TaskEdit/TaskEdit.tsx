import type { FormEvent, KeyboardEvent } from "react";


type TaskEditProps = {
    value: string;
    onChange: (value: string) => void;
    onSave: (event: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
};

export default function TaskEdit({ value, onChange, onSave, onCancel }: TaskEditProps) {
    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Escape") onCancel();
    }

    return (
        <form className="task-edit-form" onSubmit={onSave}>
            <input
                className="task-edit-input"
                value={value}
                autoFocus
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="save-btn" type="submit">שמור</button>
        </form>
    );
}
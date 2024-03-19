import { FaTimes } from "react-icons/fa";

export function Task({ task, onDelete,onToggleReminder }) {
  const reminderClassName = task.reminder ? "reminder" : "";
  return (
    <div className={`task ${reminderClassName}`} onDoubleClick={()=>onToggleReminder(task.id)}>
      <h3>
        {task.text} <FaTimes onClick={()=>onDelete(task.id)} style={{ color: "red", cursor: "pointer" }} />
      </h3>
      <p>{task.day}</p>

    </div>
  );
}

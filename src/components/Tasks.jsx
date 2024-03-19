import { Task } from "./Task";

export function Tasks({ tasks, onDelete, onToggleReminder }) {
  if(tasks.length === 0){
    return <h3>No tasks to show</h3>
  }
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} onToggleReminder={onToggleReminder}/>
      ))}
    </>
  );
}

import { Button } from "./Button";
import { useLocation } from "react-router-dom";

export function Header({ title, onAdd, showAddTask }) {
  const location = useLocation();
  if (location.pathname !== "/") {
    return null;
  }
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        text={showAddTask ? "Close" : "Add"}
        backgroundColor={showAddTask ? "red" : "steelblue"}
        onClick={onAdd}
      />
    </header>
  );
}

Header.defaultProps = {
  title: "Task Tracker",
};

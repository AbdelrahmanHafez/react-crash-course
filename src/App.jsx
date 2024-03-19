import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";
import { Footer } from "./components/Footer";
import { About } from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const { tasksFromServer } = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  async function addTask(task) {
    const id = Math.floor(Math.random() * 1000000) + 1;
    const newTask = { id, ...task };

    setTasks([...tasks, newTask]);

    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  }

  async function deleteTask(taskId) {
    await deleteTaskFromDB(taskId);

    setTasks(tasks.filter((task) => task.id !== taskId));
  }
  async function toggleReminder(taskId) {
    const { taskFromServer: task } = await fetchTask(taskId);
    const updatedTask = { ...task, reminder: !task.reminder };

    await fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, reminder: !task.reminder } : task
      )
    );
  }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          tasks={tasks}
          showAddTask={showAddTask}
        />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}

                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggleReminder={toggleReminder}
                />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

async function fetchTasks() {
  const res = await fetch("http://localhost:5000/tasks");
  const tasksFromServer = await res.json();

  return { tasksFromServer };
}
async function deleteTaskFromDB(taskId) {
  await fetch(`http://localhost:5000/tasks/${taskId}`, {
    method: "DELETE",
  });
}

async function fetchTask(taskId) {
  const res = await fetch(`http://localhost:5000/tasks/${taskId}`);
  const taskFromServer = await res.json();

  return { taskFromServer };
}

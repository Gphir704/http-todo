import "./App.css";
import { useEffect, useState } from "react";
import TasksTodo from "./components/TasksTodo";
import ComplitedTasks from "./components/ComplitedTasks";

function App() {
  const API_KEY = "7OSQqNm6nX1fzn7_LLyZzpJ65xaim_yH-hAP9hrure8RSSf8jg";
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isComplited, setIsComplited] = useState(false);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + completedTasks.length + 1,
      value: inputValue,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");

    fetch("/api/v1/todotasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ newTask }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`SOMTHING WENT WRONG `);
        return res.json();
      })
      .then((data) =>
        setTasks((prevTasks) => [
          ...prevTasks,
          {
            number: data.items[0].tasks.id,
            value: data.items[0].tasks.id,
            id: data.items[0].tasks._uuid,
          },
        ])
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetch("/api/v1/todotasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  const removeTask = (id) => {
    const activeTasks = tasks.filter((task) => task.id !== id);
    setTasks(activeTasks);
    const completedTask = tasks.find((task) => task.id === id);
    setCompletedTasks((prevCompleted) => [...prevCompleted, completedTask]);
  };

  const removeFromCompleted = (id) => {
    const updatedCompleted = completedTasks.filter(
      (completedTask) => completedTask.id !== id
    );
    setCompletedTasks(updatedCompleted);
  };

  return (
    <div className="app-container">
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="ENTER NEW TASK HERE"
          onChange={onChange}
          value={inputValue}
          className="task-input"
        />
        <button
          onClick={addTask}
          type="submit"
          disabled={inputValue === ""}
          value={inputValue}
          className="add-button"
        >
          ADD
        </button>
      </form>
      <div className="all-tasks-container">
        <div className="tasks-container">
          {tasks.map((task) => (
            <div key={task.id}>
              <TasksTodo
                id={task.id}
                value={task.value}
                action={removeTask}
                className="task-todo"
              />
            </div>
          ))}
        </div>
        <div className="completed-tasks-container">
          {completedTasks.map((completedTask) => (
            <div key={completedTask.id}>
              <ComplitedTasks
                id={completedTask.id}
                value={completedTask.id}
                action={removeFromCompleted}
                className="completed-task"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

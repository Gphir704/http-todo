import "./App.css";
import { useEffect, useState } from "react";
import TasksTodo from "./components/TasksTodo";
import ComplitedTasks from "./components/ComplitedTasks";
const API_KEY = "bWuGhoepjP3ukHK1D27_wngWsPD4iFLNVcBORCZ15Nj-I0qWFA";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isComplited, setIsComplited] = useState(false);

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const getAllUsers = () => {
    fetch("/api/v1/todoList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`SOMTHING WENT WRONG `);
        return res.json();
      })
      .then((data) =>
        setTasks(
          data.items.map((task) => {
            return {
              value: task.newTask.value,
              number: task.newTask.id,
              id: task._uuid,
            };
          })
        )
      );
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + completedTasks.length + 1,
      value: inputValue,
    };

    fetch("/api/v1/todoList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ newTask }]),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`SOMTHING WENT WRONG `);
        return res.json();
      })
      .then((data) =>
        setTasks((prevTasks) => [
          {
            value: data.items[0].newTask.value,
            number: data.items[0].newTask.id,
            id: data.items[0]._uuid,
          },
          ...prevTasks,
        ])
      )
      .then(() => setInputValue(""))
      .catch((err) => console.log(err));
  };

  return (
    <div className="app-container">
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="ADD TASKHERE"
          onChange={onChange}
          className="task-input"
        />
        <button className="add-button" disabled={inputValue === ""}>
          ADD
        </button>
      </form>
      <button onClick={getAllUsers}> GET TASKS </button>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>
            {task.number} :{task.value}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default App;

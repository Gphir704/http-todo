import React from "react";

const TasksTodo = ({ number, value, action }) => {
  return (
    <div className="tasks-todo-container">
      <h1>
        {number} : {value}
        <button>COMPLITE</button>
      </h1>
    </div>
  );
};

export default TasksTodo;

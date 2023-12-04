import React from "react";

const TasksTodo = ({ id, value, action }) => {
  return (
    <div className="tasks-todo-container">
      <h1>
        {id} : {value}
        <button onClick={() => action(id)} className="complited-btn">
          COMPLITE
        </button>
      </h1>
    </div>
  );
};

export default TasksTodo;

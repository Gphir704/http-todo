import React from "react";

const ComplitedTasks = ({ id, value, action }) => {
  return (
    <div className="complited-container">
      <h1>
        {id}:{value}
        <button onClick={() => action(id)} className="delete-btn">
          DELETE
        </button>
      </h1>
    </div>
  );
};

export default ComplitedTasks;

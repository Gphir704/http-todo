import React from "react";

const InputField = ({ addTask, onChange, inputValue }) => {
  return (
    <form onSubmit={addTask} className="task-form">
      <input
        type="text"
        placeholder="ADD TASKHERE"
        onChange={onChange}
        className="task-input"
        // value={inputValue}
        defaultValue={inputValue}
      />
      <button type="submit" className="add-button" disabled={inputValue === ""}>
        ADD
      </button>
    </form>
  );
};

export default InputField;

import { useState } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
const API = "pFH4prGqNqUo_8LBEtlmVbMmiP3INTe-HwxRT5GgjS_y_1QDjA";

const CreatePage = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const { loading, sendRequest } = useRequest({
    url: "/api/v1/tasks",
    method: "POST",
  });

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: 1,
      value: inputValue,
    };

    sendRequest([{ newTask }])
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  if (loading) return <h1> L O A D I N G . . . </h1>;
  return (
    <div>
      <InputField
        addTask={addTask}
        onChange={onChange}
        inputValue={inputValue}
      />
    </div>
  );
};

export default CreatePage;

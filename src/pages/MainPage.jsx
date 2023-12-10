import useFetch from "../hooks/useFetch";
import TasksTodo from "../components/TasksTodo";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { response, error, loading } = useFetch({
    url: "/api/v1/tasks",
    method: "GET",
  });

  const tasks =
    response?.items.map((task) => {
      return {
        value: task.newTask.value,
        number: task.newTask.id,
        id: task._uuid,
      };
    }) || [];

  if (loading) return <h2> L O A D I N G . . . </h2>;
  if (error) return <h4> {error} </h4>;
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} style={{ border: "2px solid gray" }}>
          <TasksTodo value={task.value} />
          <Link to={`/update/${task.id}`}> EDIT </Link>
        </div>
      ))}
    </div>
  );
};

export default MainPage;

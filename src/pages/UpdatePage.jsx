import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import CreatePage from "./CreatePage";

const UpdatePage = () => {
  const { id } = useParams();

  const { response, error, loading } = useFetch({
    url: `/api/v1/tasks${id}`,
    method: "GET",
  });

  return (
    <div>
      <CreatePage />
    </div>
  );
};

export default UpdatePage;

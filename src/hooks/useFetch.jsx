import { useEffect } from "react";

const useFetch = (url, method) => {
  useEffect(() => {
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify([{ newTask }]),
    });
  }, []);
};

export default useFetch;

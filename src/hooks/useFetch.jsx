import { useEffect, useState } from "react";

const useFetch = ({ url, method }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = "pFH4prGqNqUo_8LBEtlmVbMmiP3INTe-HwxRT5GgjS_y_1QDjA";
  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`SOMTHING GET WRONG `);
        return res.json();
      })
      .then((data) => setResponse(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    return () => {
      setError(null);
      setResponse(null);
      setLoading(false);
    };
  }, [url, method]);

  return { response, error, loading };
};

export default useFetch;

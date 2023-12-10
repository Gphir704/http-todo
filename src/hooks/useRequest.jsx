import { useState } from "react";
const API = "pFH4prGqNqUo_8LBEtlmVbMmiP3INTe-HwxRT5GgjS_y_1QDjA";

const useRequest = ({ url, method }) => {
  const [loading, setLoading] = useState(false);

  const sendRequest = async (body) => {
    setLoading(true);
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API}`,
      },
      body: !!body && method !== "GET" ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    setLoading(false);
    return data;
  };
  return { loading, sendRequest };
};

export default useRequest;

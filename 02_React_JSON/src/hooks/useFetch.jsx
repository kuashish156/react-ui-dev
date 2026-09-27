import React, { useEffect, useState } from "react";
import { json } from "./../../node_modules/zod/src/v4/classic/schemas";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
      console.log(result);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetch;

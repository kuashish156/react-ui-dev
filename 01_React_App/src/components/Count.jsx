import { useState } from "react";
import "./count.css";

const Count = () => {
  const [count, setCount] = useState(0);
  console.log(count);

  return (
    <div className="counter">
      <p>update value :- {count}</p>

      <button onClick={() => setCount(count + 1)}>Incress Value </button>
      <button onClick={() => (count > 0 ? setCount(count - 1) : setCount(0))}>
        Decress Value{" "}
      </button>
      <button onClick={() => setCount(0)}>Reset Value </button>
    </div>
  );
};

export default Count;

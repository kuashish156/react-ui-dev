import { useState } from "react";
import "./Task.css";

const Task = () => {
  const [tasks, setTask] = useState([
    { id: 1, useName: "Ashish", status: true },
    { id: 2, useName: "rohan", status: false },
    { id: 3, useName: "mohan", status: true },
    { id: 4, useName: "rimo", status: true },
    { id: 5, useName: "gita", status: false },
    { id: 6, useName: "kumar", status: true },
  ]);

  function handleDelate(id) {
    setTask(tasks.filter((task) => task.id !== id));
    console.log(id);
  }

  return (
    <div className="task">
      <h1>Task </h1>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} - {task.useName}
            <button onClick={() => handleDelate(task.id)} className="button">
              Delate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const addTask = () => {

    if (task.trim() === "") {
      return;
    }

    setTasks([...tasks, task]);

    setTask("");
  };

  const deleteTask = (index) => {

    const updatedTasks = tasks.filter((_, i) => i !== index);

    setTasks(updatedTasks);
  };

  const logout = () => {
    navigate("/");
  };

  return (

    <div className="container">

      <div className="box">

        <h1>Task Management App</h1>

        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>

        <ul>

          {tasks.map((t, index) => (

            <li key={index}>

              {t}

              <button
                className="delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>

            </li>

          ))}

        </ul>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;
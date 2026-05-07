import React, { useState, useEffect } from "react";

function App() {

  const [page, setPage] = useState("login");

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState("");

  // SAVE TASKS
  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);

  // ADD TASK
  const addTask = () => {

    if (task.trim() === "") return;

    const newTask = {
      text: task,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTask("");
  };

  // DELETE TASK
  const deleteTask = (index) => {

    const updatedTasks = tasks.filter((_, i) => i !== index);

    setTasks(updatedTasks);
  };

  // COMPLETE TASK
  const toggleComplete = (index) => {

    const updatedTasks = [...tasks];

    updatedTasks[index].completed =
      !updatedTasks[index].completed;

    setTasks(updatedTasks);
  };

  // EDIT TASK
  const editTask = (index) => {

    setTask(tasks[index].text);

    setEditIndex(index);
  };

  // UPDATE TASK
  const updateTask = () => {

    const updatedTasks = [...tasks];

    updatedTasks[editIndex].text = task;

    setTasks(updatedTasks);

    setTask("");

    setEditIndex(null);
  };

  // CLEAR ALL
  const clearAllTasks = () => {

    setTasks([]);
  };

  // SEARCH
  const filteredTasks = tasks.filter((t) =>
    t.text.toLowerCase().includes(search.toLowerCase())
  );

  // LOGIN PAGE
  if (page === "login") {

    return (

      <div style={styles.container}>

        <div style={styles.box}>

          <h1 style={styles.heading}>Login</h1>

          <input
            type="email"
            placeholder="Enter Email"
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={styles.input}
          />

          <button
            style={styles.button}
            onClick={() => setPage("dashboard")}
          >
            Login
          </button>

          <p style={styles.text}>
            Don't have account?

            <span
              style={styles.link}
              onClick={() => setPage("register")}
            >
              Register
            </span>
          </p>

        </div>

      </div>
    );
  }

  // REGISTER PAGE
  if (page === "register") {

    return (

      <div style={styles.container}>

        <div style={styles.box}>

          <h1 style={styles.heading}>Register</h1>

          <input
            type="text"
            placeholder="Enter Name"
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Enter Email"
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            style={styles.input}
          />

          <button
            style={styles.button}
            onClick={() => setPage("login")}
          >
            Register
          </button>

          <p style={styles.text}>
            Already have account?

            <span
              style={styles.link}
              onClick={() => setPage("login")}
            >
              Login
            </span>
          </p>

        </div>

      </div>
    );
  }

  // DASHBOARD PAGE
  return (

    <div style={styles.container}>

      <div style={styles.box}>

        <h1 style={styles.heading}>
          Task Management App
        </h1>

        <h3>Total Tasks: {tasks.length}</h3>

        {/* SEARCH TASK */}
        <input
          type="text"
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        {/* ENTER TASK */}
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />

        {/* ADD OR UPDATE BUTTON */}
        {
          editIndex === null ? (

            <button
              style={styles.button}
              onClick={addTask}
            >
              Add Task
            </button>

          ) : (

            <button
              style={styles.button}
              onClick={updateTask}
            >
              Update Task
            </button>

          )
        }

        {/* TASK LIST */}
        <ul style={styles.list}>

          {filteredTasks.map((t, index) => (

            <li key={index} style={styles.taskItem}>

              <div style={{
                display: "flex",
                alignItems: "center"
              }}>

                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(index)}
                  style={{
                    width: "20px",
                    height: "20px",
                    cursor: "pointer"
                  }}
                />

                <span
                  style={{
                    textDecoration:
                      t.completed ? "line-through" : "none",
                    marginLeft: "10px",
                    fontSize: "16px"
                  }}
                >
                  {t.text}
                </span>

              </div>

              <div>

                <button
                  style={styles.editBtn}
                  onClick={() => editTask(index)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>

              </div>

            </li>

          ))}

        </ul>

        {/* CLEAR BUTTON */}
        <button
          style={styles.clearBtn}
          onClick={clearAllTasks}
        >
          Clear All Tasks
        </button>

        {/* LOGOUT */}
        <button
          style={styles.logoutBtn}
          onClick={() => setPage("login")}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

// COLORFUL CSS
const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    fontFamily: "Arial"
  },

  box: {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    width: "450px",
    boxShadow: "0px 5px 20px rgba(0,0,0,0.3)"
  },

  heading: {
    textAlign: "center",
    color: "#4b0082"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "2px solid #667eea",
    outline: "none",
    fontSize: "16px"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  },

  list: {
    listStyle: "none",
    padding: 0
  },

  taskItem: {
    background: "#6e6c79",
    marginTop: "12px",
    padding: "12px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  editBtn: {
    background: "orange",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "5px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  clearBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "purple",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  logoutBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  text: {
    textAlign: "center",
    marginTop: "15px"
  },

  link: {
    color: "#ff416c",
    marginLeft: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default App;
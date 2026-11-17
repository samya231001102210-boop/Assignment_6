
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const Tasks = () => {
  const { tasks, deleteTask, updateTask, completeTask } = useTasks();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (priority === "All" || task.priority === priority) &&
      (category === "All" || task.category === category) &&
      (status === "All" || task.status === status)
    );
  });

  const handleStatus = (task) => {
    if (task.status === "Closed") {
      updateTask(task.id, { status: "Pending" });
    } else {
      completeTask(task.id);
    }
  };

  return (
    <div>
      <h1>All Tasks</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-container">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Personal">Personal</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Raised">Raised</option>
          <option value="Pending">Pending</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {filteredTasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Category: {task.category}</p>
            <p>Due Date: {task.dueDate}</p>

            <span className={`status ${task.status.toLowerCase()}`}>
              {task.status}
            </span>
          </div>

          <div className="task-actions">
            <Link to={`/tasks/${task.id}`} className="view-btn">
              View
            </Link>

            <button onClick={() => handleStatus(task)}>
              {task.status === "Closed" ? "Reopen" : "Complete"}
            </button>

            <button
              className="delete-btn"
              onClick={() => {
                if (window.confirm("Delete this task?")) {
                  deleteTask(task.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {filteredTasks.length === 0 && (
        <p>No matching tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;

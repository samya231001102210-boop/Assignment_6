
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tasks, updateTask, deleteTask, completeTask } = useTasks();

  const task = tasks.find((t) => t.id === id);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        category: task.category,
        dueDate: task.dueDate,
        status: task.status,
      });
    }
  }, [task]);

  if (!task) {
    return (
      <div>
        <h2>Task Not Found</h2>
        <button onClick={() => navigate("/tasks")}>
          Back to Tasks
        </button>
      </div>
    );
  }

  if (!formData) return <p>Loading...</p>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    updateTask(id, formData);

    alert("Task updated successfully!");
    navigate("/tasks");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
      navigate("/tasks");
    }
  };

  return (
    <div>
      <h1>Task Details</h1>

      <form className="task-form" onSubmit={handleUpdate}>
        <label>Task Header</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Task Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Academic</option>
          <option>Personal</option>
        </select>

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Raised</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>

        <button type="submit">Update Task</button>

        <button
          type="button"
          onClick={() => {
            completeTask(id);
            navigate("/tasks");
          }}
        >
          Mark as Completed
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete Task
        </button>
      </form>

      <p>
        <strong>Raised Date & Time:</strong>{" "}
        {new Date(task.raisedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskDetails;

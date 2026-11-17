
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Academic",
    dueDate: "",
    status: "Raised",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(formData);
    alert("Task added successfully!");

    navigate("/tasks");
  };

  return (
    <div>
      <h1>Add New Task</h1>

      <form className="task-form" onSubmit={handleSubmit}>
        <label>Task Header</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Task Description</label>
        <textarea
          name="description"
          placeholder="Enter task description"
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

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AddTask;

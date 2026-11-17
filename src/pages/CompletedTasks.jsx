
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const CompletedTasks = () => {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    (task) => task.status === "Closed"
  );

  return (
    <div>
      <h1>Completed Tasks</h1>

      <p>Total Completed: {completedTasks.length}</p>

      {completedTasks.map((task) => (
        <div className="task-card" key={task.id}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Category: {task.category}</p>
            <p>Due Date: {task.dueDate}</p>
            <span className="status closed">Closed</span>
          </div>

          <Link to={`/tasks/${task.id}`} className="view-btn">
            View Details
          </Link>
        </div>
      ))}

      {completedTasks.length === 0 && (
        <p>No completed tasks yet.</p>
      )}
    </div>
  );
};

export default CompletedTasks;

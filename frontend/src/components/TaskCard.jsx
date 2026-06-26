
function TaskCard({ task, onDelete, onEdit, onToggleStatus }) {
  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span
          className={`status-badge ${
            task.status === "completed" ? "completed" : "pending"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="task-desc">{task.description}</p>

      <p className="task-priority">
        Priority:
        <span
          className={`priority-badge ${
            task.priority === "high"
              ? "priority-high"
              : task.priority === "medium"
              ? "priority-medium"
              : "priority-low"
          }`}
        >
          {task.priority}
        </span>
      </p>

      {task.dueDate && (
        <p className="task-date">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      <div className="task-actions">
        <button className="toggle-btn" onClick={() => onToggleStatus(task)}>
          {task.status === "completed" ? "Mark Pending" : "Mark Complete"}
        </button>
        <button className="edit-btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;

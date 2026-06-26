import { useState } from "react";


function EditTask({ task, onSave, onClose }) {
  const [form, setForm] = useState(task);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="edit-task-overlay">
      <div className="edit-task-card">
        <h2 className="form-heading">Edit Task</h2>

        <form className="edit-task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate ? form.dueDate.substring(0, 10) : ""}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button className="save-btn" type="submit">Save</button>
            <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;

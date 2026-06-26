import { useState } from "react";

function AddTask({ onAdd }) {
const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  await onAdd(form);

  setLoading(false);

  setForm({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  });
};

  return (

  <div className="add-task-container">
    <form
      onSubmit={handleSubmit}
      className="add-task-form"
    >
      <input
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        required
      />

  <textarea
    name="description"
    placeholder="Description"
    value={form.description}
    onChange={handleChange}
  />

  <div className="row">
    <select
      name="priority"
      value={form.priority}
      onChange={handleChange}
    >
      <option value="low">🟢 Low</option>
      <option value="medium">🟡 Medium</option>
      <option value="high">🔴 High</option>
    </select>

    <input
      type="date"
      name="dueDate"
      value={form.dueDate}
      onChange={handleChange}
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="add-btn"
  >
    {loading
      ? "Adding..."
      : "➕ Add Task"}
  </button>
</form>
```

  </div>
);
}
export default AddTask;
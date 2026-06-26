import { useState } from "react";

function EditTask({
  task,
  onSave,
  onClose
}) {

  const [form, setForm] = useState(task);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "35%",
        background: "white",
        border: "1px solid black",
        padding: "20px"
      }}
    >
      <h2>Edit Task</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <br />
        <select
  name="priority"
  value={form.priority}
  onChange={handleChange}
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>

<br />

<input
  type="date"
  name="dueDate"
  value={
    form.dueDate
      ? form.dueDate.substring(0, 10)
      : ""
  }
  onChange={handleChange}
/>

<br />

        <button className="save-btn" type="submit">
          Save
        </button>

        <button className="cancel-btn"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default EditTask;
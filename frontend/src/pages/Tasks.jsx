import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import TaskCard from "../components/TaskCard";
import AddTask from "../components/AddTask";
import EditTask from "../components/EditTask";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import "./pages_sty.css"; // import the stylesheet

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axiosInstance.post("/tasks", taskData);
      toast.success("Task added successfully");
      setTasks((prev) => [res.data, ...prev]);
    } catch (error) {
      toast.error("Failed to add task");
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const res = await axiosInstance.put(`/tasks/${updatedTask._id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task._id === res.data._id ? res.data : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const updatedTask = {
        ...task,
        status: task.status === "completed" ? "pending" : "completed",
      };

      const res = await axiosInstance.put(`/tasks/${task._id}`, updatedTask);

      setTasks((prev) =>
        prev.map((t) => (t._id === res.data._id ? res.data : t))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "pending" && task.status !== "completed") ||
      (filter === "completed" && task.status === "completed") ||
      (filter === "high" && task.priority === "high");

    return matchSearch && matchFilter;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="tasks-container">
      <h1 className="tasks-heading">My Tasks</h1>

      <AddTask onAdd={addTask} />

      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>
          All ({tasks.length})
        </button>
        <button onClick={() => setFilter("pending")}>
          Pending ({tasks.filter((t) => t.status !== "completed").length})
        </button>
        <button onClick={() => setFilter("completed")}>
          Completed ({tasks.filter((t) => t.status === "completed").length})
        </button>
        <button onClick={() => setFilter("high")}>
          High Priority ({tasks.filter((t) => t.priority === "high").length})
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <h2>No tasks found</h2>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onEdit={setEditingTask}
              onToggleStatus={toggleStatus}
              className={`task-card ${
                task.status === "completed"
                  ? "task-completed"
                  : "task-pending"
              } ${task.priority === "high" ? "task-high" : ""}`}
            />
          ))
        )}
      </div>

      {editingTask && (
        <EditTask
          task={editingTask}
          onSave={updateTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default Tasks;

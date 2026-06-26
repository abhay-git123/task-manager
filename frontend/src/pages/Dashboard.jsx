import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import DashboardCard from "../components/DashboardCard";
import "./pages_sty.css"; // new stylesheet

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading-text">Loading Dashboard...</h2>;
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const pendingTasks = tasks.filter((task) => task.status !== "completed").length;

  return (
    <div className="dashboard-container">
      <h1 className="main-heading">Dashboard</h1>

     <div className="cards-container">
  <DashboardCard title="Total Tasks" value={totalTasks} className="dashboard-card total-card" />
  <DashboardCard title="Completed" value={completedTasks} className="dashboard-card completed-card" />
  <DashboardCard title="Pending" value={pendingTasks} className="dashboard-card pending-card" />
</div>


    </div>
  );
}

export default Dashboard;

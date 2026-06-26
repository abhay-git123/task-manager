import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "../services/axiosInstance";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (isAuthenticated) {
          const res = await axiosInstance.get("/auth/me");
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Dashboard
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
        Tasks
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
        Profile
      </NavLink>

      {user && (
        <span className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}

      {!isAuthenticated ? (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
            Register
          </NavLink>
        </>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;

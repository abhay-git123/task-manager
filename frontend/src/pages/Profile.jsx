import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import "./pages_sty.css";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent double click

    setLoading(true);

    try {
      await axiosInstance.post("/auth/register", form);

      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.error || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="main-heading">Register</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="register-input"
        required
        disabled={loading}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="register-input"
        required
        disabled={loading}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="register-input"
        required
        disabled={loading}
      />

      <button
  type="submit"
  className="btn"
  disabled={loading}
>
  {loading ? (
    <>
      <span className="spinner"></span>
      Registering...
    </>
  ) : (
    "Register"
  )}
</button>
    </form>
  );
}

export default Register;
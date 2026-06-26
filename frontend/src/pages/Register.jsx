import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import "./pages_sty.css";

function Register() {
  const navigate = useNavigate();

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

    try {
      const res = await axiosInstance.post(
        "/auth/register",
        form
      );

      toast.success("Registration successful");

      console.log(res.data);

      // Redirect to Login page after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.error ||
        "Registration failed"
      );
    }
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit}
    >
      <h2 className="main-heading">
        Register
      </h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="register-input"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="register-input"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="register-input"
        required
      />

      <button
        type="submit"
        className="btn"
      >
        Register
      </button>
    </form>
  );
}

export default Register;
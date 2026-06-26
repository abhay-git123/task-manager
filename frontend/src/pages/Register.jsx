import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import "./pages_sty.css";

function Register() {
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
      const res = await axiosInstance.post("/auth/register", form);
      toast.success("Registration successful");
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
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
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="register-input"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="register-input"
        required
      />

      <button type="submit" className="btn">
        Register
      </button>
    </form>
  );
}

export default Register;

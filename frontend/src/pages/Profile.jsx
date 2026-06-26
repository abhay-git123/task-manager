import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import toast from "react-hot-toast";
import "./pages_sty.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data);
      setName(res.data.name);
    } catch (error) {
      toast.error("Failed to load profile");
      console.log(error);
    }
  };

  // const updateProfile = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axiosInstance.put("/users/me", { name });
  //     setUser(res.data);
  //     toast.success("Profile updated");
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1500);
  //   } catch (error) {
  //     toast.error("Failed to update profile");
  //     console.log(error);
  //   }
  // };

  const updateProfile = async (e) => {
  e.preventDefault();

  try {
    const res = await axiosInstance.put("/users/me", {
      name
    });

    console.log("Response:", res.data);

    setUser(res.data);
    setName(res.data.name);

    toast.success("Profile updated!");

  } catch (error) {
    console.log(error);
    toast.error("Failed to update profile");
  }
};


  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">
      <h1 className="main-heading">Profile</h1>

      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <hr />

      <form className="profile-form" onSubmit={updateProfile}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="profile-input"
        />
        <button className="update-btn" type="submit">
          Update Name
        </button>
      </form>
    </div>
  );
}

export default Profile;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Models
const Task = require("./models/Task");

// Routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Logger Middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next();
// });

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server running with MongoDB ✅"
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Error Handler (must be after routes)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Seed Sample Tasks (Optional)
async function seedTasks() {
  try {
    await Task.deleteMany();

    await Task.insertMany([
      { title: "Learn Node.js", priority: "high" },
      { title: "Setup MongoDB Atlas", priority: "medium" },
      { title: "Create Task Schema", priority: "high" },
      { title: "Test API with Postman", priority: "low" },
      { title: "Write Day 2 deliverable", priority: "medium" }
    ]);

    console.log("Sample tasks seeded ✅");

    const tasks = await Task.find();
    console.log("All tasks:", tasks);

  } catch (error) {
    console.error("Seed error:", error);
  }
}



// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");

    // Uncomment only when reseeding
    // seedTasks();

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error(
      "DB connection error:",
      err
    );
  });
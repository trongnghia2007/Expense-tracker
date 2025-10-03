// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();

// ---------------- Middleware ----------------
app.use(express.json());

// Dev mode: CORS cho frontend khác domain
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "*" }));
}

// ---------------- Connect MongoDB ----------------
connectDB();

// ---------------- API routes ----------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// ---------------- Serve uploads ----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- Serve frontend build (production) ----------------
const frontendPath = path.join(__dirname, "../frontend/expense-tracker/dist");
app.use(express.static(frontendPath));

// SPA fallback: mọi route không khớp API trả về index.html
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ---------------- Start server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
});

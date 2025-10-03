// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

dotenv.config();

const app = express();

// ---------------- Setup __dirname cho ESM ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/expense-tracker/dist");
  app.use(express.static(frontendPath));

  // SPA fallback: mọi route không khớp API trả về index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ---------------- Start server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} (${process.env.NODE_ENV || "development"})`);
});

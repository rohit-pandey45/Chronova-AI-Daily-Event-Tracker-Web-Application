import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habit.js";
import logRoutes from "./routes/logs.js";
import aiRoutes from "./routes/ai.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
dotenv.config();
const app = express();

const allowedOrigins = [
  "https://chronova-ai-daily-event-tracker-web-application-r9v1rli05.vercel.app",
  "https://chronova-ai-daily-event-tracker-web.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", time: new Date().toISOString() })
);
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/logs", logRoutes)
app.use("/api/ai", aiRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.js";
import contactRoutes from "./routes/contact.js";
import portfolioRoutes from "./routes/portfolio.js";
import analyticsRoutes from "./routes/analytics.js";
import ownerRoutes from "./routes/owner.js";
import postsRoutes from "./routes/posts.js";

config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

function normalizeOrigin(value) {
  return (value || "").trim().replace(/\/+$/, "");
}

function expandConfiguredOrigin(value) {
  const normalized = normalizeOrigin(value);
  if (!normalized) {
    return [];
  }

  if (/^https?:\/\//i.test(normalized)) {
    return [normalized];
  }

  // Allow domain-only entries by expanding to https/http forms.
  return [`https://${normalized}`, `http://${normalized}`];
}

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
];

const configuredOriginsRaw = (process.env.FRONTEND_URL || "")
  .split(",")
  .flatMap((origin) => expandConfiguredOrigin(origin))
  .filter(Boolean);

const configuredOrigins = Array.from(new Set(configuredOriginsRaw));

const allowedOrigins =
  configuredOrigins.length > 0
    ? configuredOrigins
    : defaultAllowedOrigins.map((origin) => normalizeOrigin(origin));

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      const requestOrigin = normalizeOrigin(origin);
      if (!origin || allowedOrigins.includes(requestOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests from this IP. Please try again later.",
});

app.use("/api", limiter);

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: Number(process.env.CHAT_RATE_LIMIT_MAX_REQUESTS) || 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many chat requests. Please wait a moment.",
});

app.use("/api/chat", chatLimiter);

app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/posts", postsRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled error:", error);
  res.status(error.status || 500).json({
    error: {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    },
  });
});

app.use((_req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      status: 404,
    },
  });
});

async function startServer() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio",
      {
        serverSelectionTimeoutMS: 5000,
        bufferCommands: false,
      }
    );

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error(
      "Startup aborted. Ensure MongoDB is running or set MONGODB_URI to a reachable database."
    );
    process.exit(1);
  }
}

startServer();

export default app;

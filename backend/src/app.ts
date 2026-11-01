import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import corsOptions from "./config/cors";
import notFound from "./middleware/notFound";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors(corsOptions));

// Request body parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Cookie parsing
app.use(cookieParser());

// API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusConnect API is running",
  });
});

// API routes will be mounted here

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
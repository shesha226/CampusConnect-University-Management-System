import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { ErrorRequestHandler } from 'express';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";


const app = express();

app.use(cookieParser());


app.use(helmet());
app.use("/api/auth", authRoutes);

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}));

app.use(express.json({ limit: '10kb' }));

app.use("/api", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
}));

app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        success: true,
        message: "Server is running smoothly.",
        timestamp: new Date().toISOString()
    });
});

app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
        timestamp: new Date().toISOString()
    });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        timestamp: new Date().toISOString()
    });
};

app.use(errorHandler);
export default app;
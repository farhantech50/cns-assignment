import dotenv from "./utils/env.js";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { newAccessToken } from "./utils/generateToken.js";

import db from "./models/db.js";
import database from "./models/databaseConnection.js";

// Initialize express app
const app = express();

//CSP Configuration
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://localhost:5173"],
      },
    },
  })
);

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/newAccessToken", newAccessToken);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

export default app;

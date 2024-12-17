import express from "express";
import dotenv from "dotenv";
import TaskRouter from "./src/routes/task.routes.js";
import connectToDataBase from "./src/database/mongoose.database.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://task-manager-frontend-ivory-alpha.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
connectToDataBase();
app.use("/tasks", TaskRouter);

export default app;

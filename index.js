import express from "express";
import dotenv from "dotenv";
import TaskRouter from "./src/routes/task.routes.js";
import connectToDataBase from "./src/database/mongoose.database.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDataBase();

app.use("/tasks", TaskRouter);

app.listen(8000, () => console.log("Listening on port 8000"));

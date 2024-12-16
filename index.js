import express from "express";
import dotenv from "dotenv";
import TaskRouter from "./src/routes/task.routes.js";
import connectToDataBase from "./src/database/mongoose.database.js";

dotenv.config();

const app = express();
app.use(express.json());

connectToDataBase();

app.use("/tasks", TaskRouter);

app.listen(8000, () => console.log("Listening on port 8000"));

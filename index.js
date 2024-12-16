const express = require("express");
const dotenv = require("dotenv");
const TaskRouter = require("./src/routes/task.routes");

const connectToDataBase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(express.json());


connectToDataBase();

app.use("/tasks", TaskRouter);

app.listen(8000, () => console.log("Listening on port 8000"));

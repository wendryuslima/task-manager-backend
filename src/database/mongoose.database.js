import mongoose from "mongoose"; 
import dotenv from "dotenv";

dotenv.config();

const connectToDataBase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsc-task-manager.udhl6.mongodb.net/?retryWrites=true&w=majority&appName=FSC-TASK-MANAGER`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDataBase; // Usando export default

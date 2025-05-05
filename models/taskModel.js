import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date,required:true },
  priority: { type: String, enum: ["Low", "Medium", "High"] },
  status: { type: String, enum: ["Pending", "In Progress","Completed"], default: "Pending" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User",required:true },
});

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default TaskModel;

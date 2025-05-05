import connectToDatabase from "@/config/connectDB";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import TaskModel from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();
  try {
    const user = await getUserFromToken(req);
    const { title, description, dueDate, priority, status, assignedTo } =
      await req.json();
    if (!title?.trim() || !description || !dueDate || !priority || !status) {
      return NextResponse.json({
        message: "Please fill all the details",
        success: false,
      });
    }
    const newTask = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      assignedTo,
      userId: user?._id,
    });

    const task = await newTask.save();

    return NextResponse.json({
      message: "New Task created successfully",
      task,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

export async function GET(req) {
  await connectToDatabase();
  try {
    const user = await getUserFromToken(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized", success: false });
    // Get tasks created  by this user
    const createdTasks = await TaskModel.find({ userId: user?._id }).populate("assignedTo","name email")

    // Get tasks assigned to this user
    const assignedTasks = await TaskModel.find({
      assignedTo: user?._id,
    }).populate("userId","name email")

    return NextResponse.json({ success: true, createdTasks, assignedTasks });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

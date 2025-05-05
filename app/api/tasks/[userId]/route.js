import connectToDatabase from "@/config/connectDB";
import TaskModel from "@/models/taskModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await connectToDatabase();
  try {
    const { userId } = await params;
    
    const { title, description, dueDate, priority, status, assignedTo } =
      await req.json();

    const updatedTask = await TaskModel.findByIdAndUpdate(
      userId,
      { title, description, dueDate, priority, status, assignedTo },
      {
        new: true,
      }
    ).populate("assignedTo", "name email");

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found", success: false });
    }
    return NextResponse.json({
      message: "Task updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { userId } = params;
  try {
    const deletedTask = await TaskModel.findByIdAndDelete(userId);
    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found", success: false });
    }
    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

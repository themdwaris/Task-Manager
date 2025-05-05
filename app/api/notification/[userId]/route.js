import { NextResponse } from "next/server";
import connectToDatabase from "@/config/connectDB";
import Notification from "@/models/notificationModel";

// PUT: Mark notification as read
export async function PUT(request, { params }) {
  await connectToDatabase()
  const { userId } = await params;

  try {
    const updated = await Notification.findByIdAndUpdate(
      userId,
      { isRead: true },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Notification marked as read", notification: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update notification" },
      { status: 500 }
    );
  }
}

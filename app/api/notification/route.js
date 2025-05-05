
import { NextResponse } from "next/server";
import connectToDatabase from "@/config/connectDB";
import Notification from "@/models/notificationModel";

export async function POST(req) {
  await connectToDatabase()
  const { userId, message }= await req.json();
//   const { userId, message } = body;
// console.log("Line-10:",userId,message);


  if (!userId || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const notification = await Notification.create({
    userId,
    message,
    isRead: false,
  });

  return NextResponse.json(notification, {success:true});
}

export async function GET(req) {
  await connectToDatabase()
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
//   console.log("Line-30:",userId);
  

  if (!userId) {
    return NextResponse.json({ error: "UserId required" }, { status: 400 });
  }

  const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json(notifications,{success:true});
}

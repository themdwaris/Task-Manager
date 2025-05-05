import connectToDatabase from "@/config/connectDB";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();
  try {
    const user = await getUserFromToken(req);
    const allUsers = await UserModel.find({ _id: { $ne: user?._id } });
    return NextResponse.json({ allUsers, success: true });
  } catch (error) {
    NextResponse.json({ message: error.message || error, success: false });
  }
}

import connectToDatabase from "@/config/connectDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/userModel";

export async function GET(req) {
  await connectToDatabase();
  try {
    const token = await req.cookies.get("userToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authorized" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decode);

    const user = await UserModel.findById(decode?.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found", success: false });
    }
    return NextResponse.json({ user, success: true });
    
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

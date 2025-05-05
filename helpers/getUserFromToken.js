import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/userModel";
import connectToDatabase from "@/config/connectDB";

export async function getUserFromToken(req) {
  await connectToDatabase();
  try {
    const token = req.cookies.get("userToken")?.value;
    if (!token)
      return NextResponse.json({ message: "Not authorized", success: false });

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decode?.id).select("-password");
    if (!user)
      return NextResponse.json({ message: "User not found", success: false });

    return user;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

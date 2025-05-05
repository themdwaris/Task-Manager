import connectToDatabase from "@/config/connectDB";
import UserModel from "@/models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({
        message: "Missing credentials",
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid account" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return NextResponse.json({
        message: "Password is wrong",
        success: false,
      });
    }

    const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "5d",
    });

    const res = NextResponse.json({
      message: "Login successfully",
      success: true,
    });

      res.cookies.set("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 5 * 24 * 60 * 60,
    });
    return res
  } catch (error) {
    return NextResponse.json({
      message: error.message || error,
      success: false,
    });
  }
}

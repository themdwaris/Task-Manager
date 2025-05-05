import connectToDatabase from "@/config/connectDB";
import bcrypt from "bcrypt";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();
  const { name, email, password } = await req.json();

  if (!name?.trim() || !email || !password) {
    return NextResponse.json({
      message: "Please fill all the fields",
      success: false,
    });
  }
  const isUserExists = await UserModel.findOne({ email });
  if (isUserExists) {
    return NextResponse.json({
      message: "User is already exists",
      success: false,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ name, email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({
    message: "Account created successfully",
    success: true,
  });
}

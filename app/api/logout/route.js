import connectToDatabase from "@/config/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDatabase();

  const res = NextResponse.json({ message: "Logged out", success: true });
  res.cookies.set("userToken","", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  return res;
}

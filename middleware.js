// middleware.js
import { NextResponse } from "next/server";


export function middleware(req) {
  const token = req.cookies.get("userToken")?.value;
  const url = req.nextUrl;

  const isAuthPage = url.pathname === "/login";

  // If token not found and route is protected  redirect to login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //If token exists and route is login

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login","/createdTask","/assignedTask","/dueTask"],
};

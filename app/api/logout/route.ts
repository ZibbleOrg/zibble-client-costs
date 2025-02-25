import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const response = NextResponse.json({ success: true });
  (await cookies()).set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  })
  return response
}


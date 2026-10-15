import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/adminAuth";



export async function POST() {
  const response = NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    }
  );

  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

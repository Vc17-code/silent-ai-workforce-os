import { NextRequest, NextResponse } from "next/server";
import { getOwnerPassword, SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== getOwnerPassword()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

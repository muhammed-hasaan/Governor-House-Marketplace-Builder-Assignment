import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Hardcoded credentials - in real app, use environment variables
const VALID_EMAIL = "admin@example.com";
const VALID_PASSWORD = "admin123";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Check if credentials match
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    // Set auth cookie using the correct method
    const cookieStore = await cookies();
    cookieStore.set("auth-token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 1 week
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}

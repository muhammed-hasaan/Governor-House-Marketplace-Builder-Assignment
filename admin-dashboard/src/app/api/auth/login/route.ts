import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import bcrypt from "bcryptjs";
import * as jose from "jose";
import { client } from "@/lib/client";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    // Fetch user from Sanity
    const user = await client.fetch(
      `*[_type == "admin" && email == $email][0]`,
      { email }
    );

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT token
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new jose.SignJWT({
      userId: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    // Set JWT as HTTP-only cookie
    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
